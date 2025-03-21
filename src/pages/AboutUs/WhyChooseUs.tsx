import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button,
  useTheme,
  useMediaQuery,
  Fade,
  Zoom
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BusinessIcon from '@mui/icons-material/Business';
import FactoryIcon from '@mui/icons-material/Factory';
import OutsideLayout from '../../layout/OutsideLayout';

const serviceData = [
  {
    title: "Residential Certainty Service System",
    description: "Tailored painting solutions for homes with guaranteed quality and longevity. Our residential service system ensures your home maintains its beauty for years to come.",
    icon: <HomeIcon sx={{ fontSize: 60 }} />,
    image: "https://source.unsplash.com/random/600x400/?home,painting",
    benefits: ["Custom color consultation", "Non-toxic paint options", "5-year warranty", "Detailed prep work"]
  },
  {
    title: "Commercial Certainty Service System",
    description: "Professional solutions for offices, retail spaces, and commercial buildings. Our commercial system minimizes disruption while delivering exceptional results.",
    icon: <BusinessIcon sx={{ fontSize: 60 }} />,
    image: "https://source.unsplash.com/random/600x400/?office,painting",
    benefits: ["After-hours scheduling", "Quick-dry formulations", "Brand color matching", "Maintenance programs"]
  },
  {
    title: "Industrial Certainty Service System",
    description: "Heavy-duty painting and coating services for industrial facilities. Our industrial system focuses on durability, safety, and resistance to harsh conditions.",
    icon: <FactoryIcon sx={{ fontSize: 60 }} />,
    image: "https://source.unsplash.com/random/600x400/?factory,industrial",
    benefits: ["Chemical resistant coatings", "High-temperature solutions", "Safety compliance", "Equipment protection"]
  }
];

const WhyChooseUs: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <OutsideLayout>
      {/* Hero Image Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '250px', sm: '300px', md: '400px' },
          width: '100%',
          overflow: 'hidden',
          backgroundImage: 'url(https://source.unsplash.com/random/1920x1080/?painting,professional)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: { xs: 3, md: 5 },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1
          }
        }}
      >
        <Fade in={true} timeout={1200}>
          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              textAlign: 'center',
              px: 3
            }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                color: '#ffffff',
                fontWeight: 700,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' }
              }}
            >
              Excellence in Every Stroke
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#ffffff',
                mt: 2,
                maxWidth: '800px',
                mx: 'auto',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' }
              }}
            >
              Professional painting services tailored to your unique needs
            </Typography>
          </Box>
        </Fade>
      </Box>

      <Box 
        sx={{ 
          py: { xs: 6, md: 10 },
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Container maxWidth="lg">
          <Fade in={true} timeout={1000}>
            <Box textAlign="center" mb={6}>
              <Typography 
                variant="h2" 
                component="h1" 
                gutterBottom
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  mb: 2
                }}
              >
                Why Choose Us?
              </Typography>
              <Typography 
                variant="h5" 
                component="p"
                sx={{
                  maxWidth: '800px',
                  mx: 'auto',
                  color: theme.palette.text.secondary,
                  mb: 3
                }}
              >
                Our Certainty Service System guarantees exceptional results for every project
              </Typography>
              <Box 
                sx={{
                  width: '80px',
                  height: '4px',
                  backgroundColor: theme.palette.primary.main,
                  mx: 'auto'
                }}
              />
            </Box>
          </Fade>

          <Grid container spacing={4} justifyContent="center">
            {serviceData.map((service, index) => (
              <Grid item key={index}>
                <Zoom in={true} style={{ transitionDelay: `${index * 200}ms` }}>
                  <Card 
                    sx={{
                      width: { xs: '100%', sm: 320, md: 350 },
                      height: 600,
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 20px rgba(0,0,0,0.2)',
                        '& .MuiCardMedia-root': {
                          transform: 'scale(1.05)',
                        }
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={service.image}
                      alt={service.title}
                      sx={{
                        transition: 'transform 0.5s ease',
                      }}
                    />
                    <CardContent 
                      sx={{ 
                        p: 3, 
                        pb: 9, // Add extra padding at bottom for the button
                        overflow: 'auto',
                        height: 'calc(100% - 200px)', // Subtract image height
                        '&::-webkit-scrollbar': {
                          width: '8px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                          backgroundColor: theme.palette.primary.light,
                          borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                          backgroundColor: theme.palette.background.paper,
                        }
                      }}
                    >
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: 2,
                          color: theme.palette.primary.main
                        }}
                      >
                        {service.icon}
                      </Box>
                      
                      <Typography 
                        variant="h5" 
                        component="h2" 
                        gutterBottom
                        sx={{ 
                          fontWeight: 600,
                          color: theme.palette.text.primary
                        }}
                      >
                        {service.title}
                      </Typography>
                      
                      <Typography 
                        variant="body1" 
                        color="text.secondary" 
                        paragraph
                        sx={{ mb: 3 }}
                      >
                        {service.description}
                      </Typography>
                      
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 600,
                          mb: 1,
                          color: theme.palette.text.primary
                        }}
                      >
                        Key Benefits:
                      </Typography>
                      
                      <Box component="ul" sx={{ pl: 2, mb: 3 }}>
                        {service.benefits.map((benefit, i) => (
                          <Typography 
                            component="li" 
                            variant="body2" 
                            key={i}
                            sx={{ mb: 0.5 }}
                          >
                            {benefit}
                          </Typography>
                        ))}
                      </Box>
                    </CardContent>

                    {/* Fixed position button at the bottom */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 3,
                        pt: 2,
                        backgroundColor: theme.palette.background.paper,
                        borderTop: `1px solid ${theme.palette.divider}`
                      }}
                    >
                      <Button 
                        variant="contained" 
                        color="primary"
                        fullWidth
                        sx={{
                          py: 1.5,
                          fontWeight: 500,
                        }}
                      >
                        Learn More
                      </Button>
                    </Box>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </OutsideLayout>
  );
};

export default WhyChooseUs;
