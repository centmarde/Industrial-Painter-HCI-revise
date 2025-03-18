
import { Box, Typography, Container, Paper } from '@mui/material';
import DarkModeToggle from '../components/DarkModeToggle';

const Home = () => {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: (theme) => theme.palette.mode === 'light' 
             ? `linear-gradient(135deg, ${theme.custom.lighter} 0%, ${theme.custom.darkest} 100%)`
          : `linear-gradient(135deg, #202020 0%, #121212 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3
      }}
    >
      <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
        <DarkModeToggle />
      </Box>
      
      <Container maxWidth="sm">
        <Paper 
          elevation={6} 
          sx={{ 
            padding: 4, 
            borderRadius: 2,
            textAlign: 'center',
            backgroundColor: (theme) => theme.custom.lighter
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              color: (theme) => theme.custom.darkest
            }}
          >
            Hello World!
          </Typography>
          
          <Typography variant="h5" sx={{ mt: 2 }}>
            Welcome to Industrial Painter
          </Typography>
          
          <Typography variant="body1" sx={{ mt: 3 }}>
            This is the home page of our application.
            More features will be added soon!
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
