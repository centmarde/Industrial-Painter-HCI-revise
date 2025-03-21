import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  useTheme,
  Paper,
  Divider,
  Avatar,
  useMediaQuery,
  Fade
} from '@mui/material';
import { styled } from '@mui/material/styles';
import OutsideLayout from '../../layout/OutsideLayout';
import PaintBrushIcon from '@mui/icons-material/Brush';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PeopleIcon from '@mui/icons-material/People';

// Styled components
const StorySection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
}));

const ValueCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
  overflow: 'visible',
  position: 'relative',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 30px rgba(0, 0, 0, 0.15)',
  },
}));

const IconAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: 60,
  height: 60,
  position: 'absolute',
  top: -20,
  left: '50%',
  transform: 'translateX(-50%)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
}));

const HeroImage = styled('img')({
  maxWidth: '100%',
  height: 'auto',
});

const AccentBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '30%',
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    opacity: 0.1,
    borderRadius: theme.shape.borderRadius,
    zIndex: -1,
  },
}));

const OurStory: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <OutsideLayout>
      <Container maxWidth="lg">
        {/* Hero Section with Image */}
        <Grid container spacing={4} alignItems="center" sx={{ pt: 8, pb: 6 }}>
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={1000}>
              <Box>
                <Typography 
                  variant="h2" 
                  component="h1" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 700,
                    position: 'relative',
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: 0,
                      width: '80px',
                      height: '4px',
                      backgroundColor: theme.palette.primary.main,
                    }
                  }}
                >
                  Our Story
                </Typography>
                <Typography 
                  variant="h6" 
                  color="text.secondary" 
                  sx={{ mb: 4, maxWidth: '90%' }}
                >
                  A journey of transformation, excellence, and dedication to service
                </Typography>
                <Box sx={{ width: '50px', height: '4px', bgcolor: theme.palette.secondary.main, mb: 2 }} />
              </Box>
            </Fade>
          </Grid>
          <Grid item xs={12} md={6}>
            <Fade in={true} timeout={1500}>
              <Box sx={{ 
                position: 'relative', 
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: -15,
                  right: -15,
                  width: '70%',
                  height: '70%',
                  borderRadius: 2,
                  border: `3px solid ${theme.palette.secondary.main}`,
                  zIndex: -1
                }
              }}>
                <HeroImage 
                  src="/images/misc/canvas.png" 
                  alt="Industrial painters at work" 
                />
              </Box>
            </Fade>
          </Grid>
        </Grid>
        
        {/* Company History Section */}
        <AccentBox sx={{ mb: 8 }}>
          <StorySection>
            <Paper 
              elevation={3} 
              sx={{ 
                p: { xs: 3, md: 5 }, 
                backgroundColor: theme.palette.background.paper,
                borderRadius: 3,
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100px',
                  height: '100px',
                  background: `radial-gradient(circle, ${theme.palette.primary.light}30, transparent 70%)`,
                  opacity: 0.5,
                }
              }}
            >
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  color: theme.palette.primary.main,
                  position: 'relative',
                  pl: 2,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '10%',
                    height: '80%',
                    width: '4px',
                    backgroundColor: theme.palette.primary.main,
                  }
                }}
              >
                The Industrial Painter Story
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                In 1992, Industrial Painter began with the vision of making residential and commercial painting services easier and more convenient for homeowners and business owners. From the beginning, our promise has been that of certainty, aiming to reassure customers of our quality and expertise. While today we are the largest residential painting contractor in North America, our locally owned and operated franchises take pride in bringing personalized service to customers in every region, allowing them to focus on what matters most.
              </Typography>
            </Paper>
          </StorySection>
        </AccentBox>

        {/* Core Values Section */}
        <StorySection>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                color: theme.palette.primary.main,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '3px',
                  backgroundColor: theme.palette.secondary.main,
                }
              }}
            >
              Our Core Values
            </Typography>
            <Typography variant="subtitle1" sx={{ maxWidth: '700px', mx: 'auto', mt: 2, color: 'text.secondary' }}>
              These principles guide everything we do and represent our commitment to excellence
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {/* Value 1 */}
            <Grid item xs={12} md={4}>
              <Fade in={true} timeout={1000}>
                <ValueCard>
                  <IconAvatar>
                    <PaintBrushIcon />
                  </IconAvatar>
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', pt: 5, px: 3 }}>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom 
                      sx={{ 
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                        mt: 2
                      }}
                    >
                      Deliver What You Promise
                    </Typography>
                    <Divider sx={{ my: 2, width: '30%', mx: 'auto' }} />
                    <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                      We stand behind our commitments and take pride in delivering exceptional service that meets or exceeds customer expectations every time.
                    </Typography>
                  </CardContent>
                </ValueCard>
              </Fade>
            </Grid>
            
            {/* Value 2 */}
            <Grid item xs={12} md={4}>
              <Fade in={true} timeout={1500}>
                <ValueCard>
                  <IconAvatar>
                    <AutorenewIcon />
                  </IconAvatar>
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', pt: 5, px: 3 }}>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom 
                      sx={{ 
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                        mt: 2
                      }}
                    >
                      Continuous Improvement
                    </Typography>
                    <Divider sx={{ my: 2, width: '30%', mx: 'auto' }} />
                    <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                      We constantly seek better ways to serve our customers and improve our processes, staying at the forefront of the painting industry.
                    </Typography>
                  </CardContent>
                </ValueCard>
              </Fade>
            </Grid>
            
            {/* Value 3 */}
            <Grid item xs={12} md={4}>
              <Fade in={true} timeout={2000}>
                <ValueCard>
                  <IconAvatar>
                    <PeopleIcon />
                  </IconAvatar>
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', pt: 5, px: 3 }}>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      gutterBottom 
                      sx={{ 
                        color: theme.palette.primary.main,
                        fontWeight: 600,
                        mt: 2
                      }}
                    >
                      Respect the Individual
                    </Typography>
                    <Divider sx={{ my: 2, width: '30%', mx: 'auto' }} />
                    <Typography variant="body1" sx={{ fontSize: '1rem' }}>
                      We value each person's unique contributions and treat everyone with dignity and respect, from our team members to our customers.
                    </Typography>
                  </CardContent>
                </ValueCard>
              </Fade>
            </Grid>
          </Grid>
        </StorySection>

        {/* FirstService Brands Section */}
        <StorySection sx={{ mb: 6 }}>
          <Fade in={true} timeout={1000}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: { xs: 3, md: 5 },
                backgroundColor: theme.palette.background.paper,
                borderRadius: 3,
                backgroundImage: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.background.paper} 60%, ${theme.palette.primary.main}10)`,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  color: theme.palette.primary.main,
                  display: 'inline-block',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: '40%',
                    height: '3px',
                    backgroundColor: theme.palette.primary.main,
                  }
                }}
              >
                FirstService Brands
              </Typography>
              <Typography variant="body1" sx={{ mt: 3, fontSize: '1.1rem', maxWidth: '90%' }}>
                Industrial Painter is proud to be a part of FirstService Brands, a leader in the home service industry. As a member of this esteemed family of franchise companies, we leverage collective expertise and resources to deliver superior service and value to our customers across North America.
              </Typography>
              <Box 
                sx={{ 
                  position: 'absolute', 
                  bottom: '-10%', 
                  right: '-5%', 
                  width: '200px', 
                  height: '200px', 
                  borderRadius: '50%', 
                  background: `radial-gradient(circle, ${theme.palette.primary.main}20, transparent 70%)`,
                  zIndex: 0
                }} 
              />
            </Paper>
          </Fade>
        </StorySection>
      </Container>
    </OutsideLayout>
  );
};

export default OurStory;
