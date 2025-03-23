import React, { useState } from 'react';
import { Box, Button, Container, Typography, CircularProgress, useTheme, keyframes, alpha } from '@mui/material';
import { useAuth } from '../stores/Auth';
import { useNavigate } from 'react-router-dom';
import OutsideLayout from '../layout/OutsideLayout';

const AccessDenied = () => {
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const pulse = keyframes`
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.1);
      opacity: 0.8;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  `;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  const goLogin = () => {
    navigate('/login');
  };

  return (
    <OutsideLayout>
    <Container maxWidth="sm" sx={{ 
      my: 4, 
      position: 'relative',
      zIndex: 1,
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: -20,
        left: -20,
        right: -20,
        bottom: -20,
        background: `radial-gradient(circle, transparent 20%, ${theme.palette.background.default} 20%, ${theme.palette.background.default} 80%, transparent 80%, transparent), 
                    radial-gradient(circle, transparent 20%, ${theme.palette.background.default} 20%, ${theme.palette.background.default} 80%, transparent 80%, transparent) 50px 50px`,
        backgroundSize: '100px 100px',
        backgroundPosition: '0 0, 50px 50px',
        opacity: 0.1,
        zIndex: -1,
      }
    }}>
      {/* Image added with larger dimensions */}
      <Box sx={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
        <img 
          src="/images/errors/403.png"
          alt="Access Denied" 
          style={{ width: '100%', height: 'auto' }} 
        />
      </Box>
      
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        align="center" 
        sx={{ 
          fontWeight: 'bold', 
          color: theme.palette.text.primary,
          mb: 2,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40px',
            height: '3px',
            background: theme.palette.primary.main,
          }
        }}
      >
        Access Denied
      </Typography>
      
      <Typography 
        variant="body1" 
        align="center" 
        sx={{ 
          mb: 4, 
          maxWidth: '80%', 
          color: theme.palette.text.secondary,
          fontWeight: 500
        }}
      >
        You are trying to access pages that needs authentication. Would you like to login?
      </Typography>
      
      <Box sx={{ mt: 0, width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', width: '100%' }}>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={goLogin}
            size="large"
            sx={{ 
              px: 4, 
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 6px 12px ${alpha(theme.palette.primary.main, 0.2)}`
              }
            }}
          >
           Login
          </Button>
          
        
        </Box>
        
        {isLoggingOut && (
          <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
            Redirecting to login page in a few seconds...
          </Typography>
        )}
      </Box>
    </Container>
    </OutsideLayout>
  
  );
};

export default AccessDenied;
