import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  useTheme
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import OutsideLayout from '../../layout/OutsideLayout';
import { useNavigate } from 'react-router-dom';

const Corporate: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  return (
    <OutsideLayout>
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Header */}
      <Box sx={{ mb: 8, textAlign: 'center' }}>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{ 
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            mb: 2 
          }}
        >
          Corporate Opportunities
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            maxWidth: '800px', 
            mx: 'auto',
            color: theme.palette.text.secondary 
          }}
        >
          Join our growing team and be part of a company committed to excellence in industrial painting
        </Typography>
      </Box>

      {/* Careers Section */}
      <Box 
        sx={{ 
          mb: 10,
          p: 4,
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.paper,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <WorkOutlineIcon sx={{ fontSize: 40, mr: 2, color: theme.palette.primary.main }} />
          <Typography variant="h3" component="h2">
            Careers with Industrial Painter
          </Typography>
        </Box>
        
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          We're always looking for talented individuals to join our team. At Industrial Painter, 
          we offer competitive compensation, comprehensive benefits, and opportunities for professional growth.
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom sx={{ color: theme.palette.primary.main }}>
                  Field Positions
                </Typography>
                <Typography paragraph>
                  Join our skilled painting teams across the country with opportunities for:
                </Typography>
                <List>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: '40px' }}>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Painters" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: '40px' }}>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Project Managers" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: '40px' }}>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Crew Leaders" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom sx={{ color: theme.palette.primary.main }}>
                  Office Positions
                </Typography>
                <Typography paragraph>
                  Support our operations with your administrative expertise:
                </Typography>
                <List>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: '40px' }}>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Administrative Staff" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: '40px' }}>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Customer Service" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: '40px' }}>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Estimators" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom sx={{ color: theme.palette.primary.main }}>
                  Management Positions
                </Typography>
                <Typography paragraph>
                  Lead our teams with your management experience:
                </Typography>
                <List>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: '40px' }}>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Regional Managers" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: '40px' }}>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Operations Directors" />
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemIcon sx={{ minWidth: '40px' }}>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Sales Executives" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            variant="contained" 
            size="large"
            onClick={handleNavigateToLogin}
            sx={{ 
              py: 1.5,
              px: 4,
              mt: 2
            }}
          >
            View Current Openings
          </Button>
        </Box>
      </Box>

      {/* Our Values Section */}
      <Box 
        sx={{ 
          mb: 10,
          p: 4,
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.paper,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <PeopleAltOutlinedIcon sx={{ fontSize: 40, mr: 2, color: theme.palette.primary.main }} />
          <Typography variant="h3" component="h2">
            Our Values
          </Typography>
        </Box>

        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          At Industrial Painter, our values define who we are and how we operate. These core principles guide our decisions and actions every day.
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom sx={{ color: theme.palette.primary.main }}>
                  Quality & Excellence
                </Typography>
                <Typography>
                  We take pride in our workmanship and are committed to delivering exceptional results that exceed expectations. 
                  We use premium materials and advanced techniques to ensure lasting quality.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom sx={{ color: theme.palette.primary.main }}>
                  Safety First
                </Typography>
                <Typography>
                  We prioritize the safety of our employees, clients, and the public in every project we undertake. 
                  Our comprehensive safety protocols exceed industry standards.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom sx={{ color: theme.palette.primary.main }}>
                  Innovation
                </Typography>
                <Typography>
                  We continuously seek better ways to serve our clients through new technologies, materials, and methods. 
                  Innovation drives our approach to solving complex industrial painting challenges.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 3, height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h3" gutterBottom sx={{ color: theme.palette.primary.main }}>
                  Integrity & Transparency
                </Typography>
                <Typography>
                  We operate with honesty and transparency in all our business relationships. 
                  We provide clear communication, fair pricing, and stand behind our promises.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Franchise Opportunities */}
      <Box 
        sx={{ 
          mb: 8,
          p: 4,
          borderRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.background.paper,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <StoreOutlinedIcon sx={{ fontSize: 40, mr: 2, color: theme.palette.primary.main }} />
          <Typography variant="h3" component="h2">
            Franchise Opportunities
          </Typography>
        </Box>
        
        <Typography variant="body1" paragraph>
          Own your own Industrial Painter franchise and become part of our growing network of successful business owners. 
          Our proven business model and comprehensive support system provide you with everything you need to build a thriving business.
        </Typography>
        
        <Grid container spacing={4} sx={{ my: 4 }}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h5" component="h3" gutterBottom sx={{ color: theme.palette.primary.main }}>
                Why Choose Our Franchise?
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Established Brand Recognition" 
                    secondary="Benefit from our national marketing and reputation."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Comprehensive Training" 
                    secondary="Receive thorough technical and business management training."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Ongoing Support" 
                    secondary="Access to our network of experts and continuing education resources."
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Proprietary Systems" 
                    secondary="Use our field-tested operational systems and technology."
                  />
                </ListItem>
              </List>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#2a2a2a', borderRadius: 2 }}>
              <Typography variant="h5" component="h3" gutterBottom sx={{ color: theme.palette.primary.main }}>
                Franchise Investment
              </Typography>
              <Typography paragraph>
                Initial investment ranges from $150,000 to $300,000 depending on your location and market size.
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                What's Included:
              </Typography>
              <List dense>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: '40px' }}>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Exclusive territory rights" />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: '40px' }}>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Initial equipment package" />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: '40px' }}>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Marketing launch package" />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: '40px' }}>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Complete training program" />
                </ListItem>
              </List>
              
              <Button 
                variant="contained" 
                fullWidth 
                size="large"
                onClick={handleNavigateToLogin}
                sx={{ 
                  mt: 3,
                  py: 1.5
                }}
              >
                Request Franchise Information
              </Button>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Ready to take the next step?
          </Typography>
          <Typography paragraph sx={{ maxWidth: 700, mx: 'auto', mb: 3 }}>
            Join our network of successful franchise owners and build a business with proven demand and recurring revenue.
          </Typography>
          <Button 
            variant="outlined" 
            size="large"
            onClick={handleNavigateToLogin}
            sx={{ 
              py: 1.5,
              px: 4,
              mr: 2
            }}
          >
            Download Brochure
          </Button>
          <Button 
            variant="contained" 
            size="large"
            onClick={handleNavigateToLogin}
            sx={{ 
              py: 1.5,
              px: 4
            }}
          >
            Schedule Consultation
          </Button>
        </Box>
      </Box>
    </Container>
    </OutsideLayout>
  );
};

export default Corporate;
