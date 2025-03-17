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
      main: '#BDB395',
      dark: '#A9A082',
      light: '#D5C7A3',
    },
    secondary: {
      main: '#F2E2B1',
      dark: '#D5C7A3',
      light: '#F6F0F0',
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
    darkest: '#BDB395',
    darker: '#D5C7A3',
    light: '#F2E2B1',
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
          backgroundColor: '#BDB395',
          '&:hover': {
            backgroundColor: '#A9A082',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#BDB395',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#BDB395',
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#BDB395',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#BDB395',
          '&.Mui-checked': {
            color: '#BDB395',
          },
        },
      },
    },
  },
});

// Default theme is light mode
const theme = createAppTheme('light');

export default theme;
