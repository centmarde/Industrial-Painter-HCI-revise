import { Box, Typography, Container, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeToggle from '../../components/DarkModeToggle';
import InsideLayout from '../../layout/InsideLayout';
import { useAuth } from '../../stores/Auth';
import { useUserStore } from '../../stores/UserStore';
import { showToast } from '../../utils/toastConfig';

const Home = () => {
  const { logout } = useAuth();
  const resetUser = useUserStore(state => state.resetUser);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // First logout from Firebase
      await logout();
      // Then reset the Zustand store
      resetUser();
      // Show success toast
      showToast.success('Logout successful');
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      showToast.error('Logout failed. Please try again.');
    }
  };

  return (
    <InsideLayout>
      <Box 
        sx={{ 
          minHeight: '100vh',
          background: (theme) => theme.palette.mode === 'light' 
               ? `linear-gradient(135deg, ${theme.custom.lighter} 0%, ${theme.custom.darkest} 100%)`
            : `linear-gradient(135deg, #202020 0%, #121212 100%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 3,
          position: 'relative'
        }}
      >
        <Box sx={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: 2 }}>
          <DarkModeToggle />
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Box>
        
        <Container maxWidth="sm">
          <Paper 
            elevation={6} 
            sx={{ 
              padding: 4, 
              borderRadius: 2,
              textAlign: 'center',
              backgroundColor: (theme) => theme.custom.lighter
            }}
          >
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                color: (theme) => theme.custom.darkest
              }}
            >
              Hello World!
            </Typography>
            
            <Typography variant="h5" sx={{ mt: 2 }}>
              Welcome to Industrial Painter
            </Typography>
            
            <Typography variant="body1" sx={{ mt: 3 }}>
              This is the home page of our application.
              More features will be added soon!
            </Typography>
          </Paper>
        </Container>
      </Box>
    </InsideLayout>
  );
};

export default Home;
