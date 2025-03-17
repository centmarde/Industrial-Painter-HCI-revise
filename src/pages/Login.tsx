import { useState } from 'react';
import { Box, Container, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import DarkModeToggle from '../components/DarkModeToggle';

// Styled components for enhanced visual appeal
const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: '100vh',
  background: theme.palette.mode === 'light' 
    ? `linear-gradient(135deg, ${theme.custom.lighter} 0%, ${theme.custom.darkest} 100%)`
    : `linear-gradient(135deg, #202020 0%, #121212 100%)`,
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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <StyledContainer maxWidth={false}>
      <Grid container sx={{ minHeight: '100vh' }}>
        {/* Left side container - hidden on small screens */}
        <Grid item xs={0} md={6} lg={7} sx={{ 
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* This container is intentionally left blank */}
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
