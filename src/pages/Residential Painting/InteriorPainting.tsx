import React from 'react';
import InteriorPaintingServices from '../../common/InteriorPaintingServices';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Paper, 
  Button,
  useTheme
} from '@mui/material';
import OutsideLayout from '../../layout/OutsideLayout';
import { useThemeContext } from '../../context/ThemeContext';

const InteriorPainting: React.FC = () => {
  const theme = useTheme();
  const { mode } = useThemeContext();
  const isDark = mode === 'dark';
  
  const serviceSteps = [
    {
      id: 1,
      title: 'Color Selection',
      description: 'We help you choose the perfect color palette for your space, offering professional color consultations and samples to ensure youre completely satisfied with your selection.'
    },
    {
      id: 2,
      title: 'Protect the Area',
      description: 'Before starting any work, we carefully cover and protect your furniture, floors, and fixtures to ensure they remain free from paint splatter and damage.'
    },
    {
      id: 3,
      title: 'Prepare Surfaces',
      description: 'We thoroughly clean, sand, and prime all surfaces to be painted, repairing any cracks, holes, or imperfections to create a smooth, perfect canvas.'
    },
    {
      id: 4,
      title: 'Apply New Paint',
      description: 'Using premium quality paints and professional techniques, we apply multiple coats as needed to achieve flawless, long-lasting results.'
    },
    {
      id: 5,
      title: 'Clean Up',
      description: 'After painting is complete, we remove all protective coverings, clean the area thoroughly, and dispose of all project-related waste properly.'
    },
    {
      id: 6,
      title: 'Walk Through Inspection',
      description: 'We conduct a detailed final inspection with you to ensure every aspect of the job meets our high standards and your complete satisfaction.'
    }
  ];

  return (
     <OutsideLayout>
    <Box sx={{ 
      bgcolor: 'background.default', 
      color: 'text.primary',
      
    }}>
      <Box sx={{ 
        bgcolor: theme.custom.darkest, 
        py: 10, 
        mb: 6,
        color: 'white',
        textAlign: 'center'
      }}>
        <Container>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ color: isDark ? '#fff' : 'inherit' }}
          >
            Interior Painting Services
          </Typography>
          <Typography 
            variant="h5"
            sx={{ color: isDark ? '#e0e0e0' : 'inherit' }}
          >
            Transform your living spaces with our professional interior painting services
          </Typography>
        </Container>
      </Box>

      <Container>
        <Box sx={{ mb: 8 }}>
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            sx={{ 
              textAlign: 'center',
              mb: 4,
              color: isDark ? '#fff' : 'primary.main'
            }}
          >
            Our Interior Painting Process
          </Typography>
          
          <Grid container spacing={3}>
            {serviceSteps.map(step => (
              <Grid item xs={12} md={6} lg={4} key={step.id}>
                <Paper 
                  elevation={isDark ? 3 : 2} 
                  sx={{ 
                    p: 3, 
                    height: '100%',
                    transition: 'transform 0.3s ease-in-out',
                    bgcolor: isDark ? theme.palette.background.paper : 'white',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: 4
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      mb: 2
                    }}
                  >
                    <Box 
                      sx={{ 
                        bgcolor: 'primary.main',
                        color: 'white',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        fontWeight: 'bold'
                      }}
                    >
                      {step.id}
                    </Box>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      sx={{ 
                        color: isDark ? theme.palette.text.primary : 'primary.main' 
                      }}
                    >
                      {step.title}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body1"
                    sx={{ 
                      color: isDark ? theme.palette.text.secondary : 'inherit'
                    }}
                  >
                    {step.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <InteriorPaintingServices />
    

      
    </Box>
      
    
    </OutsideLayout>
  );
};

export default InteriorPainting;
