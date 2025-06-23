import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as SupabaseUser, Session, AuthError } from '@supabase/supabase-js';
import { supabase, handleSupabaseError, withRetry } from '../lib/supabase';
import { Database } from '../types/supabase';

type UserProfile = Database['public']['Tables']['user_profiles']['Row'];

export interface User extends UserProfile {
  email: string;
}

interface AuthState {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  serviceStatus: 'healthy' | 'degraded' | 'down';
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SESSION'; payload: { session: Session | null; user: User | null } }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SERVICE_STATUS'; payload: 'healthy' | 'degraded' | 'down' }
  | { type: 'CLEAR_ERROR' };

const initialState: AuthState = {
  user: null,
  session: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  serviceStatus: 'healthy',
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_SESSION':
      return {
        ...state,
        session: action.payload.session,
        user: action.payload.user,
        isAuthenticated: !!action.payload.session,
        loading: false,
        error: null,
        serviceStatus: 'healthy',
      };
    case 'SET_ERROR':
      return { 
        ...state, 
        error: action.payload, 
        loading: false,
        serviceStatus: action.payload?.includes('server') || action.payload?.includes('gangguan') ? 'down' : 'degraded'
      };
    case 'SET_SERVICE_STATUS':
      return { ...state, serviceStatus: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null, serviceStatus: 'healthy' };
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  signUp: (email: string, password: string, userData: { fullName: string; phone?: string; role?: string }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  clearError: () => void;
  isAdmin: () => boolean;
  isSuperAdmin: () => boolean;
  refreshSession: () => Promise<void>;
  retryConnection: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState);

  // Fetch user profile from database with enhanced error handling
  const fetchUserProfile = async (supabaseUser: SupabaseUser, retryCount = 0): Promise<User | null> => {
    try {
      return await withRetry(async () => {
        // First, check if the user profile exists
        const { data: profile, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', supabaseUser.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching user profile:', error);
          
          // If profile doesn't exist, create a basic user object
          if (error.code === 'PGRST116' || !profile) {
            console.log('User profile not found, creating basic user object');
            return {
              id: supabaseUser.id,
              full_name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'User',
              phone: supabaseUser.user_metadata?.phone || null,
              role: (supabaseUser.user_metadata?.role as any) || 'user',
              status: 'active' as any,
              avatar_url: null,
              company: null,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              email: supabaseUser.email || '',
            };
          }
          
          throw error;
        }

        if (!profile) {
          // Create a basic user object if profile doesn't exist
          return {
            id: supabaseUser.id,
            full_name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'User',
            phone: supabaseUser.user_metadata?.phone || null,
            role: (supabaseUser.user_metadata?.role as any) || 'user',
            status: 'active' as any,
            avatar_url: null,
            company: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            email: supabaseUser.email || '',
          };
        }

        return {
          ...profile,
          email: supabaseUser.email || '',
        };
      }, 2, 1000);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      
      // Return a basic user object as fallback
      return {
        id: supabaseUser.id,
        full_name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'User',
        phone: supabaseUser.user_metadata?.phone || null,
        role: (supabaseUser.user_metadata?.role as any) || 'user',
        status: 'active' as any,
        avatar_url: null,
        company: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        email: supabaseUser.email || '',
      };
    }
  };

  // Handle session changes with enhanced error handling
  const handleSessionChange = async (session: Session | null) => {
    try {
      if (session?.user) {
        const userProfile = await fetchUserProfile(session.user);
        dispatch({ type: 'SET_SESSION', payload: { session, user: userProfile } });
      } else {
        dispatch({ type: 'SET_SESSION', payload: { session: null, user: null } });
      }
    } catch (error) {
      console.error('Error handling session change:', error);
      // Still set the session but with a basic user object
      if (session?.user) {
        const basicUser: User = {
          id: session.user.id,
          full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
          phone: session.user.user_metadata?.phone || null,
          role: (session.user.user_metadata?.role as any) || 'user',
          status: 'active' as any,
          avatar_url: null,
          company: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          email: session.user.email || '',
        };
        dispatch({ type: 'SET_SESSION', payload: { session, user: basicUser } });
      } else {
        dispatch({ type: 'SET_SESSION', payload: { session: null, user: null } });
      }
    }
  };

  useEffect(() => {
    // Get initial session with enhanced error handling
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
          const errorMessage = handleSupabaseError(error);
          dispatch({ type: 'SET_ERROR', payload: errorMessage });
        } else {
          await handleSessionChange(session);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
        const errorMessage = handleSupabaseError(error);
        dispatch({ type: 'SET_ERROR', payload: errorMessage });
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      await handleSessionChange(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, userData: { fullName: string; phone?: string; role?: string }) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      const result = await withRetry(async () => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: userData.fullName,
              phone: userData.phone,
              role: userData.role || 'user',
            },
          },
        });

        if (error) {
          throw error;
        }

        return data;
      }, 3, 2000);

      // If email confirmation is disabled, the user will be automatically signed in
      if (result.session) {
        await handleSessionChange(result.session);
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    } catch (error) {
      const errorMessage = handleSupabaseError(error);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      const result = await withRetry(async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }

        return data;
      }, 3, 2000);

      await handleSessionChange(result.session);
    } catch (error) {
      console.error('Sign in error:', error);
      const errorMessage = handleSupabaseError(error);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const signOut = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      await withRetry(async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
          throw error;
        }
      }, 2, 1000);
    } catch (error) {
      const errorMessage = handleSupabaseError(error);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      await withRetry(async () => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) {
          throw error;
        }
      }, 2, 1000);
    } catch (error) {
      const errorMessage = handleSupabaseError(error);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const updatePassword = async (password: string) => {
    dispatch({ type: 'CLEAR_ERROR' });

    try {
      await withRetry(async () => {
        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
          throw error;
        }
      }, 2, 1000);
    } catch (error) {
      const errorMessage = handleSupabaseError(error);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!state.user) {
      throw new Error('No user logged in');
    }

    dispatch({ type: 'CLEAR_ERROR' });

    try {
      const result = await withRetry(async () => {
        const { data, error } = await supabase
          .from('user_profiles')
          .update(updates)
          .eq('id', state.user!.id)
          .select()
          .single();

        if (error) {
          throw error;
        }

        return data;
      }, 2, 1000);

      // Update local state
      const updatedUser = { ...state.user, ...result };
      dispatch({ 
        type: 'SET_SESSION', 
        payload: { session: state.session, user: updatedUser } 
      });
    } catch (error) {
      const errorMessage = handleSupabaseError(error);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const refreshSession = async () => {
    try {
      const result = await withRetry(async () => {
        const { data: { session }, error } = await supabase.auth.refreshSession();
        if (error) {
          throw error;
        }
        return session;
      }, 2, 1000);
      
      await handleSessionChange(result);
    } catch (error) {
      const errorMessage = handleSupabaseError(error);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      throw error;
    }
  };

  const retryConnection = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      // Try to refresh the session to test connectivity
      await refreshSession();
    } catch (error) {
      // If refresh fails, try to get the current session
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        await handleSessionChange(session);
      } catch (retryError) {
        const errorMessage = handleSupabaseError(retryError);
        dispatch({ type: 'SET_ERROR', payload: errorMessage });
        throw retryError;
      }
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const isAdmin = () => {
    return state.user?.role === 'admin' || state.user?.role === 'superadmin';
  };

  const isSuperAdmin = () => {
    return state.user?.role === 'superadmin';
  };

  const value: AuthContextType = {
    ...state,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updatePassword,
    updateProfile,
    clearError,
    isAdmin,
    isSuperAdmin,
    refreshSession,
    retryConnection,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};