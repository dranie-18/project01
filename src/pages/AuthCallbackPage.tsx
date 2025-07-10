import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Helmet } from 'react-helmet-async';

const AuthCallbackPage: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If authentication is not loading and the user is authenticated, redirect them
    if (!loading && isAuthenticated) {
      navigate('/dashboard', { replace: true }); // Redirect to user dashboard
    } else if (!loading && !isAuthenticated) {
      // If not authenticated after loading, it means the authentication failed or link was invalid
      navigate('/login', { replace: true }); // Redirect to login page
    }
  }, [isAuthenticated, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <Helmet>
        <title>Processing Authentication...</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-neutral-600">Processing authentication, please wait...</p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;
