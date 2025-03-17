import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '../context/ThemeContext';
import { styled } from '@mui/material/styles';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  borderRadius: '50%',
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
  padding: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
  },
  transition: 'all 0.3s ease',
}));

const DarkModeToggle: React.FC = () => {
  const { mode, toggleTheme } = useThemeContext();
  
  return (
    <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
      <StyledIconButton
        onClick={toggleTheme}
        aria-label="toggle dark mode"
        size="small"
      >
        {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
      </StyledIconButton>
    </Tooltip>
  );
};

export default DarkModeToggle;
