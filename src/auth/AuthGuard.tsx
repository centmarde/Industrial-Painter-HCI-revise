import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../stores/Auth';
import 'react-toastify/dist/ReactToastify.css';
import { showToast, toastMessages } from '../utils/toastConfig';

interface AuthGuardProps {
  children: ReactNode;
  fallbackPath?: string;
}

const AuthGuard = ({ children, fallbackPath = '/login' }: AuthGuardProps) => {
  const { currentUser, loading } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!loading) {
      // Set checking to false once loading is complete, regardless of auth status
      setChecking(false);
    }
  }, [currentUser, loading]);

  // Add a second useEffect to handle toast notifications
  useEffect(() => {
    if (!loading && !checking && !currentUser) {
      showToast.error(toastMessages.authRequired, {
        toastId: 'auth-required' // Prevent duplicate toasts
      });
    }
  }, [loading, checking, currentUser]);

  if (loading || checking) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh' 
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Checking authentication...
        </Typography>
      </Box>
    );
  }

  // If we're not loading or checking and user is not authenticated, redirect
  if (!currentUser) {
    return <Navigate to={fallbackPath} replace />;
  }

  // If we've made it this far, the user is authenticated
  return <>{children}</>;
};

export default AuthGuard;
