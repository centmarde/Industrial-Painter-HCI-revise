import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import logoImage from '../assets/images/logo.png';
// Remove Font Awesome imports as they're no longer needed

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

// Reduce the gap between image and text
const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5), // Reduced from default gap
}));

// Style for the text with script-like appearance
const StylizedText = styled(Typography)(({ theme }) => ({
  fontFamily: "'Segoe Script', 'Brush Script MT', cursive",
  fontWeight: 'bold',
  // Remove display:flex and gap since we no longer need to position an icon
}));

const Logo: React.FC<LogoProps> = ({ size = 'medium', showText = true }) => {
  const getSize = () => {
    switch(size) {
      case 'small': return { imgSize: 30, fontSize: '0.5rem' };
      case 'large': return { imgSize: 100, fontSize: '3.2rem' };
      default: return { imgSize: 50, fontSize: '1rem' };
    }
  };
  
  const { imgSize, fontSize } = getSize();
  
  return (
    <LogoContainer>
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
