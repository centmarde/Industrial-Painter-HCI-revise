import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../stores/Auth';
import { useUserStore } from '../stores/UserStore';
import { Box, CircularProgress, Typography } from '@mui/material';
import { showToast, toastMessages } from '../utils/toastConfig';
import 'react-toastify/dist/ReactToastify.css';

interface PublicRouteGuardProps {
  children: ReactNode;
  redirectPath?: string;
}

const PublicRouteGuard = ({ 
  children, 
  redirectPath = '/home' 
}: PublicRouteGuardProps) => {
  const { currentUser, loading } = useAuth();
  const storedUser = useUserStore(state => state.user);
  const [checking, setChecking] = useState(true);
  const [minDelayPassed, setMinDelayPassed] = useState(false);
  
  // Check if we have a user from either source
  const hasUser = Boolean(currentUser || storedUser);
  
  useEffect(() => {
    if (!loading) {
      setChecking(false);
     
    }
  }, [loading, hasUser]);

  // Add a minimum 2-second delay for the loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinDelayPassed(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // If we have a stored user and minimum delay has passed, redirect
  if (hasUser && minDelayPassed) {
    return <Navigate to={redirectPath} replace />;
  }

  // Show loading if we're still authenticating or if the minimum delay hasn't passed
  if ((loading && !hasUser && checking) || !minDelayPassed) {
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

  // Not authenticated and minimum delay passed, render the children (public content)
  return <>{children}</>;
};

export default PublicRouteGuard;
