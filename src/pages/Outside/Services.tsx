import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Rating,
  Paper,
  useTheme,
  Grid
} from '@mui/material';
import OutsideLayout from '../../layout/OutsideLayout';
import { useThemeContext } from '../../context/ThemeContext';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Services: React.FC = () => {
  const { mode } = useThemeContext();
  const isDark = mode === 'dark';
  const theme = useTheme();
  const navigate = useNavigate();
  return (
    <OutsideLayout>
      <Box 
        component="section" 
        sx={{ 
          py: 8, 
          backgroundColor: isDark ? theme.palette.background.default : '#fff' 
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            sx={{ 
              textAlign: 'center', 
              mb: 6, 
              color: isDark ? theme.palette.text.primary : 'inherit' 
            }}
          >
            Our Services
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box 
                component="img" 
                src="/images/exteriorPainting/Service.png" 
                alt="Painting Services" 
                sx={{ 
                  width: '80%', 
                  height: 'auto', 
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} mt={15}>
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: 3, 
                  color: isDark ? theme.palette.text.primary : 'inherit' 
                }}
              >
                Professional Painting Services
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 3, 
                  color: isDark ? theme.palette.text.secondary : 'inherit' 
                }}
              >
                We offer a comprehensive range of professional painting services for both residential and commercial properties. Our team of experienced painters uses high-quality materials and techniques to ensure a flawless finish that lasts.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                size="large" 
                sx={{ mb: 4 }}
                onClick={() => navigate('/login')}
              >
                Learn More
              </Button>
            </Grid>
          </Grid>
          
          {/* Testimonial Section with Quote */}
          <Paper 
            elevation={isDark ? 3 : 1}
            sx={{ 
              my: 8, 
              p: 5, 
              borderRadius: 2,
              backgroundColor: isDark ? theme.palette.background.paper : '#fff',
              borderLeft: `5px solid ${theme.palette.primary.main}`
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography 
                variant="h5" 
                component="blockquote" 
                sx={{ 
                  fontStyle: 'italic', 
                  textAlign: 'center',
                  mb: 3,
                  color: isDark ? theme.palette.text.primary : 'inherit'
                }}
              >
                "I was eager to make my new home awesome. The old paint was drab and dirty, and the colors definitely weren't my style. Based on past experience I called on CertaPro Painters® to transform my living room, kitchen and hall with show-stopping colors."
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                <Rating name="read-only" value={5} readOnly size="large" />
                <Typography 
                  variant="subtitle1" 
                  sx={{ 
                    mt: 2,
                    fontWeight: 'bold',
                    color: isDark ? theme.palette.text.primary : 'inherit'
                  }}
                >
                  - Alison | Home Owner
                </Typography>
              </Box>
              
              <Button 
                variant="contained" 
                color="secondary" 
                size="large" 
                sx={{ mt: 3 }}
                component={Link} // Use component prop to render as Link
                to="/login"      // Now to prop works because it's a Link
              >
                Get a Free Quote
              </Button>
            </Box>
          </Paper>
          
          {/* Service Categories */}
          <Typography 
            variant="h3" 
            sx={{ 
              textAlign: 'center', 
              my: 5,
              color: isDark ? theme.palette.text.primary : 'inherit' 
            }}
          >
            Our Service Categories
          </Typography>
          
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {[
              {
                title: "Residential Painting",
                description: "Interior and exterior painting services for homes of all sizes.",
                image: "/images/services/residential.jpg"
              },
              {
                title: "Commercial Painting",
                description: "Professional painting solutions for offices, retail spaces, and other commercial properties.",
                image: "/images/services/commercial.jpg"
              },
              {
                title: "Specialty Finishes",
                description: "Custom textures, faux finishes, and decorative painting techniques.",
                image: "/images/services/specialty.jpg"
              }
            ].map((service, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper
                  elevation={isDark ? 3 : 1}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    borderRadius: 2,
                    backgroundColor: isDark ? theme.palette.background.paper : '#fff',
                  }}
                >
                  <Box
                    component="img"
                    src={service.image}
                    alt={service.title}
                    sx={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover'
                    }}
                  />
                  <Box sx={{ p: 3, flexGrow: 1 }}>
                    <Typography
                      variant="h5"
                      sx={{
                        mb: 2,
                        color: isDark ? theme.palette.text.primary : 'inherit'
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 3,
                        color: isDark ? theme.palette.text.secondary : 'inherit'
                      }}
                    >
                      {service.description}
                    </Typography>
                    <Button 
                      variant="outlined" 
                      color="primary"
                      onClick={() => navigate('/login')}
                    >
                      Learn More
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
     
    </OutsideLayout>
  );
};

export default Services;
