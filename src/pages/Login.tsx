import { useState } from 'react';
import { Box, Container, Paper, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';

// Styled components for enhanced visual appeal
const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
  width: '100%',
  maxWidth: 500,
  overflow: 'hidden',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
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
  },
}));

const Login = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <StyledContainer maxWidth={false}>
      <StyledPaper elevation={6}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700 }}>
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
    </StyledContainer>
  );
};

export default Login;
