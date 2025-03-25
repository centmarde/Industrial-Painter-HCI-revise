import React from 'react';
import { Box, Typography, Container, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import notFoundImage from '/images/errors/404.png'; // You'll need to add this image to your assets

const NotFound = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          py: 0,
          position: 'relative',
        }}
      >
        <img 
          src={notFoundImage} 
          alt="Page Not Found" 
          style={{ 
            width: '80%', 
            height: 'auto', 
            maxHeight: '',
         
          }}
        />
        
        <Typography 
          variant="h5" 
          color="text.secondary" 
          paragraph
          sx={{ 
            mb: 0,
            position: 'relative',
            top: {
              xs: '-20px',  // Mobile view (-20px)
              sm: '-100px'  // Tablet and above (-100px)
            },
            width: '100%'
          }}
        >
          The page you are looking for doesn't exist or has been moved.
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/home')}
          sx={{ 
            position: 'relative',
            top:  {
              xs: '-10px',  // Mobile view (-20px)
              sm: '-80px'  // Tablet and above (-100px)
            },
            px: 3,
            py: 1
          }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
