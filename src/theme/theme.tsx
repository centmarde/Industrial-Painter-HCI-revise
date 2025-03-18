import { createTheme, PaletteMode } from '@mui/material/styles';

// Augment the Theme interface
declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      darkest: string;
      darker: string;
      light: string;
      lighter: string;
    };
  }
  // allow configuration using `createTheme()`
  interface ThemeOptions {
    custom?: {
      darkest?: string;
      darker?: string;
      light?: string;
      lighter?: string;
    };
  }
}

// Create theme based on mode
export const createAppTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    primary: {
      main: '#FB8500',
      dark: '#E07700',
      light: '#FF9D33',
    },
    secondary: {
      main: '#FFB703',
      dark: '#E6A403',
      light: '#FFC433',
    },
    background: {
      default: mode === 'light' ? '#F6F0F0' : '#121212',
      paper: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
    },
    text: {
      primary: mode === 'light' ? '#333333' : '#E0E0E0',
      secondary: mode === 'light' ? '#666666' : '#B0B0B0',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  custom: {
    darkest: '#FB8500',
    darker: '#FF9D33',
    light: '#FFB703',
    lighter: mode === 'light' ? '#F6F0F0' : '#1E1E1E',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          },
        },
        contained: {
          backgroundColor: '#FB8500',
          '&:hover': {
            backgroundColor: '#E07700',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#FB8500',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FB8500',
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#FB8500',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#FB8500',
          '&.Mui-checked': {
            color: '#FB8500',
          },
        },
      },
    },
  },
});

// Default theme is dark mode instead of light mode
const theme = createAppTheme('dark');

export default theme;
