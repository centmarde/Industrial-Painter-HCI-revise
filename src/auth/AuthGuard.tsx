import { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../stores/Auth';
import { useUserStore } from '../stores/UserStore';
import 'react-toastify/dist/ReactToastify.css';
import { showToast, toastMessages } from '../utils/toastConfig';

interface AuthGuardProps {
  children: ReactNode;
  fallbackPath?: string;
}

const AuthGuard = ({ children, fallbackPath = '/login' }: AuthGuardProps) => {
  const { currentUser, loading } = useAuth();
  const storedUser = useUserStore(state => state.user);
  const [checking, setChecking] = useState(true);
  const [minDelayPassed, setMinDelayPassed] = useState(false);
  
  // Check if we have a user from either source
  const hasUser = Boolean(currentUser || storedUser);

  useEffect(() => {
    // Only continue checking if we're still loading and don't have a user
    if (!loading || hasUser) {
      setChecking(false);
    }
  }, [currentUser, loading, hasUser]);
  
  // Add a minimum 2-second delay for the loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinDelayPassed(true);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Show loading state only if we're still authenticating or minimum delay hasn't passed
  if (((loading || checking) && !storedUser) || !minDelayPassed) {
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

  // If not authenticated after checking and minimum delay has passed, redirect
  if (!hasUser && !checking && minDelayPassed) {
    return <Navigate to={fallbackPath} replace />;
  }

  // Either authenticated or still checking with a stored user
  return <>{children}</>;
};

export default AuthGuard;
