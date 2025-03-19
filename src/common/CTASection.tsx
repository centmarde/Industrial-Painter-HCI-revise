import React from 'react';
import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({
  title = "Ready to Transform Your Home's Exterior?",
  subtitle = "Contact us today for a free consultation and estimate",
  buttonText = "Get a Free Quote",
  onButtonClick
}) => {
  const { mode } = useThemeContext();
  const isDark = mode === 'dark';
  const theme = useTheme();
  const navigate = useNavigate();

  const handleButtonClick = () => {
   
      navigate('/login');
   
  };

  return (
    <Box 
      className="cta-section py-5" 
      sx={{ 
        backgroundColor: isDark ? theme.palette.primary.dark : theme.palette.primary.main,
        color: '#fff',
        py: 5
      }}
    >
      <Container sx={{ textAlign: 'center' }}>
        <Typography variant="h3" sx={{ mb: 4 }}>
          {title}
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          {subtitle}
        </Typography>
        <Button 
          variant={isDark ? "outlined" : "contained"}
          size="large"
          onClick={handleButtonClick}
          sx={{ 
            borderColor: isDark ? '#fff' : undefined,
            color: isDark ? '#fff' : theme.palette.primary.contrastText,
            bgcolor: isDark ? 'transparent' : theme.palette.secondary.main,
            '&:hover': {
              bgcolor: isDark ? 'rgba(255,255,255,0.1)' : theme.palette.secondary.dark
            }
          }}
        >
          {buttonText}
        </Button>
      </Container>
    </Box>
  );
};

export default CTASection;
