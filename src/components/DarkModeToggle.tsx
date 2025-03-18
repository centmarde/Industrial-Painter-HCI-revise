import React from 'react';
import { IconButton, Tooltip, Button, useMediaQuery, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '../context/ThemeContext';

const DarkModeToggle: React.FC = () => {
  const { mode, toggleTheme } = useThemeContext();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
      {isLargeScreen ? (
        <IconButton
          onClick={toggleTheme}
          aria-label="toggle dark mode"
          size="small"
        >
          {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      ) : (
        <Button
          onClick={toggleTheme}
          aria-label="toggle dark mode"
          size="small"
          startIcon={mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        >
          Toggle Dark Mode
        </Button>
      )}
    </Tooltip>
  );
};

export default DarkModeToggle;
