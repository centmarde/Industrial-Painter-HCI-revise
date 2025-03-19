import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Button,
  useTheme
} from '@mui/material';

const InteriorPaintingServices: React.FC = () => {
  const theme = useTheme();
  
  const services = [
    {
      id: 1,
      title: 'Residential Room Painting',
      description: 'Complete interior painting for living rooms, bedrooms, kitchens, and bathrooms.',
      image: '/images/residential-room.jpg'
    },
    {
      id: 2,
      title: 'Ceiling Painting',
      description: 'Expert ceiling painting including smooth, textured, and specialty finishes.',
      image: '/images/ceiling-painting.jpg'
    },
    {
      id: 3,
      title: 'Trim & Woodwork',
      description: 'Detailed painting of trim, baseboards, crown molding, and wooden features.',
      image: '/images/trim-woodwork.jpg'
    },
    {
      id: 4,
      title: 'Accent Walls',
      description: 'Creative accent walls with solid colors, patterns, or textured finishes.',
      image: '/images/accent-walls.jpg'
    },
    {
      id: 5,
      title: 'Cabinet Refinishing',
      description: 'Cabinet painting and refinishing for kitchens and bathrooms.',
      image: '/images/cabinet-refinishing.jpg'
    },
    {
      id: 6,
      title: 'Specialty Finishes',
      description: 'Faux finishes, textured walls, and decorative painting techniques.',
      image: '/images/specialty-finishes.jpg'
    }
  ];

  return (
    <Box sx={{ py: 6, bgcolor: theme.custom.lighter }}>
      <Container>
        <Typography 
          variant="h3" 
          component="h2" 
          gutterBottom 
          sx={{ 
            textAlign: 'center',
            mb: 2,
            color: 'primary.main'
          }}
        >
          Our Interior Painting Services
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            textAlign: 'center', 
            mb: 6,
            maxWidth: '800px',
            mx: 'auto'
          }}
        >
          We offer comprehensive interior painting solutions tailored to your specific needs and style preferences.
        </Typography>
        
        <Grid container spacing={4}>
          {services.map(service => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={service.image}
                  alt={service.title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    gutterBottom
                    sx={{ color: 'primary.main' }}
                  >
                    {service.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {service.description}
                  </Typography>
                  <Button 
                    size="small"
                    color="primary"
                    sx={{ 
                      fontWeight: 'medium',
                      '&:hover': { 
                        backgroundColor: 'transparent',
                        textDecoration: 'underline' 
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default InteriorPaintingServices;
