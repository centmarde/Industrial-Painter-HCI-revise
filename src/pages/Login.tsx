import { useState } from 'react';
import { Box, Container, Grid, Paper, Tab, Tabs, Typography, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import DarkModeToggle from '../components/DarkModeToggle';
import Logo from '../components/Logo';
import happinessGif from '../assets/images/Paint.png';

// Styled components for enhanced visual appeal
const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: '100vh',
 
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
  width: '100%',
  maxWidth: 500,
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.custom.lighter,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${theme.custom.darkest}, ${theme.custom.light})`,
  },
  animation: 'fadeIn 0.6s ease-out',
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' }
  },
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiTabs-indicator': {
    height: 3,
    borderRadius: '3px',
    backgroundColor: theme.custom.darkest,
  },
  '& .MuiTab-root': {
    color: theme.palette.text.secondary,
    '&.Mui-selected': {
      color: theme.custom.darkest,
      fontWeight: 600,
    },
  },
}));

const Login = () => {
  const [tabValue, setTabValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <StyledContainer maxWidth={false}>
      {/* Logo in the top left corner - hidden on mobile */}
      {!isMobile && (
        <Box sx={{ 
          position: 'absolute', 
          top: 16, 
          left: 16,
          zIndex: 1
        }}>
          <Logo size="small" />
        </Box>
      )}
      
      <Grid container sx={{ minHeight: '100vh' }}>
        {/* Left side container - hidden on small screens */}
        <Grid item xs={0} md={6} lg={7} sx={{ 
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Box
            component="img"
            src={happinessGif}
            alt="Industrial Painter"
            sx={{
              maxWidth: '60%',
              maxHeight: '600%',
              objectFit: 'contain',
              animation: 'fadeIn 1s ease-out',
              '@keyframes fadeIn': {
                from: { opacity: 0, transform: 'scale(0.95)' },
                to: { opacity: 1, transform: 'scale(1)' }
              },
            }}
          />
        </Grid>
        
        {/* Right side login/register panel - full width on small screens */}
        <Grid item xs={12} md={6} lg={5} sx={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: { xs: 2, sm: 3, md: 4 }
        }}>
          <StyledPaper elevation={6} sx={{ 
            maxWidth: { xs: '100%', sm: 450, md: 500 },
            width: '100%'
          }}>
            <DarkModeToggle />
            
            <Typography variant="h4" align="center" gutterBottom sx={{ 
              fontWeight: 700,
              color: (theme) => theme.custom.darkest 
            }}>
              Industrial Painter
            </Typography>
            
            <StyledTabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              aria-label="login register tabs"
            >
              <Tab label="Login" />
              <Tab label="Register" />
            </StyledTabs>
            
            <Box sx={{ mt: 2 }}>
              {tabValue === 0 ? <LoginForm /> : <RegisterForm />}
            </Box>
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Login;
