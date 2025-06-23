import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    // Add retry configuration for better error handling
    retryAttempts: 3,
    retryDelay: 1000,
  },
  // Add global configuration for better error handling
  global: {
    headers: {
      'X-Client-Info': 'properti-pro-web',
    },
  },
  // Configure realtime with better error handling
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// Enhanced error handling utility
export const handleSupabaseError = (error: any): string => {
  console.error('Supabase error:', error);
  
  // Handle specific error types
  if (error?.message) {
    const message = error.message.toLowerCase();
    
    // Database schema errors
    if (message.includes('database error querying schema') || message.includes('schema')) {
      return 'Layanan sedang mengalami gangguan. Silakan coba lagi dalam beberapa menit atau hubungi administrator.';
    }
    
    // Authentication errors
    if (message.includes('invalid login credentials')) {
      return 'Email atau password tidak valid.';
    }
    
    if (message.includes('email not confirmed')) {
      return 'Silakan konfirmasi email Anda terlebih dahulu.';
    }
    
    if (message.includes('too many requests')) {
      return 'Terlalu banyak percobaan login. Silakan tunggu beberapa menit sebelum mencoba lagi.';
    }
    
    // Network errors
    if (message.includes('network') || message.includes('fetch')) {
      return 'Koneksi internet bermasalah. Silakan periksa koneksi Anda dan coba lagi.';
    }
    
    // Server errors
    if (message.includes('internal server error') || message.includes('unexpected_failure')) {
      return 'Server sedang mengalami gangguan. Silakan coba lagi dalam beberapa menit.';
    }
  }
  
  // Default error message
  return error?.message || 'Terjadi kesalahan yang tidak diketahui. Silakan coba lagi.';
};

// Retry wrapper for Supabase operations
export const withRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      
      // Don't retry on authentication errors
      if (error?.message?.includes('invalid login credentials') || 
          error?.message?.includes('email not confirmed')) {
        throw error;
      }
      
      // Don't retry on the last attempt
      if (attempt === maxRetries) {
        break;
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
      console.log(`Retrying operation (attempt ${attempt + 1}/${maxRetries})`);
    }
  }
  
  throw lastError;
};

// Add a helper function to check Supabase connection with retry
export const checkSupabaseConnection = async (): Promise<boolean> => {
  try {
    return await withRetry(async () => {
      const { error } = await supabase.from('user_profiles').select('count').limit(1);
      if (error) {
        throw error;
      }
      return true;
    }, 2, 500);
  } catch (error) {
    console.error('Supabase connection check failed:', error);
    return false;
  }
};

// Service status checker
export const checkServiceStatus = async (): Promise<{
  isHealthy: boolean;
  message: string;
}> => {
  try {
    // Try a simple query to test the service
    const { error } = await supabase.auth.getSession();
    
    if (error) {
      return {
        isHealthy: false,
        message: handleSupabaseError(error)
      };
    }
    
    return {
      isHealthy: true,
      message: 'Layanan berjalan normal'
    };
  } catch (error) {
    return {
      isHealthy: false,
      message: handleSupabaseError(error)
    };
  }
};