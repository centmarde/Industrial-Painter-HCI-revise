import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import logoImage from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  cursor: 'pointer', // Add cursor pointer to indicate it's clickable
}));

const StylizedText = styled(Typography)(({ theme }) => ({
  fontFamily: "'Segoe Script', 'Brush Script MT', cursive",
  fontWeight: 'bold',
}));

const Logo: React.FC<LogoProps> = ({ size = 'medium', showText = true }) => {
  const navigate = useNavigate();
  const getSize = () => {
    switch(size) {
      case 'small': return { imgSize: 30, fontSize: '0.5rem' };
      case 'large': return { imgSize: 100, fontSize: '3.2rem' };
      default: return { imgSize: 50, fontSize: '1rem' };
    }
  };
  
  const { imgSize, fontSize } = getSize();
  
  const handleLogoClick = () => {
    // Navigate to home page
    navigate('/');
    
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <LogoContainer onClick={handleLogoClick}> 
      <Box
        component="img"
        src={logoImage}
        alt="Industrial Paint Logo"
        sx={{
          width: imgSize,
          height: imgSize,
          objectFit: 'contain',
        }}
      />
      
      {showText && (
        <StylizedText
          sx={{
            fontSize: fontSize,
            color: theme => theme.custom.darkest,
          }}
        >
          Industrial Painter
        </StylizedText>
      )}
    </LogoContainer>
  );
};

export default Logo;
