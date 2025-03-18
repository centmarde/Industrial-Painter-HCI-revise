import { Box, Button, Container, Grid, Typography, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import OutsideLayout from '../layout/OutsideLayout';
import happinessGif from '../assets/images/Paint.png';

const HeroSection = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  position: 'relative',
  overflow: 'hidden',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(5),
  padding: theme.spacing(1, 4),
  fontSize: '1rem',
  textTransform: 'none',
  fontWeight: 600,
  marginRight: theme.spacing(2),
  boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
  },
}));

const HeroLanding = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <OutsideLayout>
      <HeroSection>
        <Container maxWidth="xl" sx={{ mt: 8 }}>
          <Grid container spacing={4} padding={6} alignItems="center" sx={{ minHeight: '90vh' }}>
            {/* Hero Text Content */}
            <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
              <Box sx={{ 
                animation: 'fadeIn 0.8s ease-out',
                '@keyframes fadeIn': {
                  from: { opacity: 0, transform: 'translateY(20px)' },
                  to: { opacity: 1, transform: 'translateY(0)' }
                }
              }}>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 800,
                    mb: 2,
                    color: theme.custom.darkest
                  }}
                >
                  Industrial Painter
                </Typography>
                
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    my: 4,
                    maxWidth: '90%',
                    lineHeight: 1.5
                  }}
                >
                  Revolutionize your industrial painting workflow with our state-of-the-art solution.
                  Manage projects, optimize resources, and deliver perfection on every surface.
                </Typography>

                <Box sx={{ mt: 5, mb: { xs: 5, md: 0 } }}>
                  <StyledButton 
                    variant="contained" 
                    size="large" 
                    color="primary"
                    component={Link}
                    to="/login"
                    sx={{ 
                      bgcolor: theme.custom.darkest,
                      '&:hover': { bgcolor: theme.custom.darker }
                    }}
                  >
                    Get Started
                  </StyledButton>
                  
                  <StyledButton 
                    variant="outlined" 
                    size="large"
                    component={Link}
                    to="/register"
                    sx={{ 
                      color: theme.custom.darkest,
                      borderColor: theme.custom.darkest,
                      '&:hover': { 
                        borderColor: theme.custom.darker,
                        bgcolor: 'rgba(0,0,0,0.04)'
                      }
                    }}
                  >
                    Learn More
                  </StyledButton>
                </Box>
              </Box>
            </Grid>
            
            {/* Hero Image */}
            <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 }, textAlign: 'end' }}>
              <Box
                component="img"
                src={happinessGif}
                alt="Industrial Painter"
                sx={{
                  maxWidth: '100%',
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'contain',
                  animation: 'floatAnimation 3s ease-in-out infinite',
                  '@keyframes floatAnimation': {
                    '0%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                    '100%': { transform: 'translateY(0px)' }
                  },
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </HeroSection>
    </OutsideLayout>
  );
};

export default HeroLanding;
