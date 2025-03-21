import React from 'react';
import { 
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider,
  useTheme,
  Fade,
  Grow
} from '@mui/material';
import { 
  CheckCircleOutline, 
  AccountBalance, 
  Business, 
  Construction,
  LocalShipping,
  HealthAndSafety,
  Apartment,
  Factory,
  School
} from '@mui/icons-material';
import OutsideLayout from '../../layout/OutsideLayout';

const NationalAccount = () => {
  const theme = useTheme();

  return (
    <OutsideLayout>
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default,
      py: 6
    }}>
      {/* Hero Section - Mission & Vision */}
      <Container maxWidth="lg">
        <Fade in={true} timeout={1000}>
          <Paper elevation={3} sx={{ 
            p: { xs: 4, md: 6 }, 
            mb: 6, 
            borderRadius: 2,
            backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}22, ${theme.palette.secondary.main}22)`,
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative elements */}
            <Box sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '35%',
              height: '100%',
              background: `url('/images/misc/mission.png')`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              borderTopRightRadius: 8,
              borderBottomRightRadius: 8,
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                
              },
              display: { xs: 'none', md: 'block' }
            }} />
            
            {/* Mobile image for small screens */}
            <Box sx={{
              width: '100%',
              height: 200,
              background: `url('/images/industrial-painting-hero.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              mb: 3,
              borderRadius: 1,
              display: { xs: 'block', md: 'none' }
            }} />
            
            <Box sx={{ 
              position: 'relative', 
              zIndex: 1,
              width: { xs: '100%', md: '60%' }
            }}>
              <Typography 
                variant="h3" 
                component="h1" 
                gutterBottom 
                sx={{ 
                  color: theme.palette.primary.main,
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: 80,
                    height: 4,
                    backgroundColor: theme.palette.secondary.main,
                    borderRadius: 2
                  }
                }}
              >
                National Accounts
              </Typography>
              
              <Box sx={{ mb: 4, mt: 5 }}>
                <Typography variant="h4" gutterBottom sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  '&::before': {
                    content: '""',
                    display: 'block',
                    width: 4,
                    height: 24,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1
                  }
                }}>
                  Our Mission
                </Typography>
                <Typography variant="body1" paragraph sx={{ 
                  pl: 2,
                  borderLeft: `2px solid ${theme.palette.secondary.main}20`,
                  ml: 0.5
                }}>
                  To provide unparalleled industrial painting services nationwide through innovative solutions, exceptional quality, and sustainable practices that enhance the longevity and appearance of our clients' assets.
                </Typography>
              </Box>
              
              <Box>
                <Typography variant="h4" gutterBottom sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  '&::before': {
                    content: '""',
                    display: 'block',
                    width: 4,
                    height: 24,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1
                  }
                }}>
                  Our Vision
                </Typography>
                <Typography variant="body1" paragraph sx={{ 
                  pl: 2,
                  borderLeft: `2px solid ${theme.palette.secondary.main}20`,
                  ml: 0.5
                }}>
                  To be the leading national provider of industrial painting services, recognized for excellence, integrity, and creating lasting value for our clients across all industries.
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Fade>
        
        {/* Benefits Section */}
        <Grow in={true} timeout={1500}>
          <Paper elevation={3} sx={{ p: 4, mb: 6, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.main }}>
              Benefit from Our Scale, Competence and Ease of Doing Business
            </Typography>
            
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 } }}>
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      National Coverage
                    </Typography>
                    <Typography variant="body2">
                      With teams strategically located across the country, we can provide consistent service quality wherever your facilities are located.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 } }}>
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      Standardized Processes
                    </Typography>
                    <Typography variant="body2">
                      Our proven methodologies ensure consistent quality, safety standards, and predictable outcomes across all your projects.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 } }}>
                  <CardContent>
                    <Typography variant="h6" component="div" gutterBottom>
                      Volume Pricing
                    </Typography>
                    <Typography variant="body2">
                      Leverage our scale for competitive pricing on materials and services across all your facilities and projects.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            
            <List sx={{ mt: 3 }}>
              {[
                'Single point of contact for all your project needs',
                'Reduced administrative overhead through consolidated services',
                'Consistent quality and branding across all locations',
                'Streamlined communication and reporting',
                'Customized solutions for industry-specific requirements'
              ].map((benefit, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleOutline sx={{ color: theme.palette.primary.main }} />
                  </ListItemIcon>
                  <ListItemText primary={benefit} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grow>
        
        {/* Single Source Management Section */}
        <Fade in={true} timeout={2000}>
          <Paper elevation={3} sx={{ p: 4, mb: 6, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.main }}>
              Single Source to Manage Your Projects and Billing
            </Typography>
            
            <Grid container spacing={4} sx={{ mt: 2 }}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Centralized Project Management
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Our dedicated account managers coordinate all aspects of your projects across multiple locations, ensuring consistency and efficiency.
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Simplified Procurement
                  </Typography>
                  <Typography variant="body1" paragraph>
                    One master service agreement covers all your locations, eliminating the need for multiple vendor relationships and contracts.
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Consolidated Billing
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Receive consolidated invoices with detailed breakdowns by location, significantly reducing accounting complexity and paperwork.
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Comprehensive Reporting
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Access detailed reports on all your projects through our client portal, with customizable dashboards that provide real-time insights.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Fade>
        
        {/* Industries Served Section */}
        <Grow in={true} timeout={2500}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom sx={{ color: theme.palette.primary.main }}>
              Strategic Accounts Industries Served
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ mb: 4 }}>
              Our expertise spans across multiple industries, providing specialized industrial painting solutions for various environments and requirements.
            </Typography>
            
            <Grid container spacing={3}>
              {[
                { icon: <Factory />, title: 'Manufacturing', desc: 'Durable coatings for production facilities and equipment' },
                { icon: <Business />, title: 'Commercial', desc: 'High-quality finishes for office buildings and retail spaces' },
                { icon: <Apartment />, title: 'Multi-Family Housing', desc: 'Long-lasting exterior and interior solutions for residential complexes' },
                { icon: <Construction />, title: 'Industrial', desc: 'Specialized coatings for industrial facilities and infrastructure' },
                { icon: <LocalShipping />, title: 'Logistics', desc: 'Floor markings and protective coatings for warehouses and distribution centers' },
                { icon: <HealthAndSafety />, title: 'Healthcare', desc: 'Antimicrobial and easy-to-clean finishes for medical facilities' },
                { icon: <School />, title: 'Education', desc: 'Safe, durable paints for schools and university buildings' },
                { icon: <AccountBalance />, title: 'Government', desc: 'Compliant solutions for federal, state, and municipal facilities' }
              ].map((industry, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: '0.3s',
                    '&:hover': { 
                      transform: 'scale(1.05)',
                      boxShadow: 6,
                      '& .MuiSvgIcon-root': {
                        color: theme.palette.primary.main,
                        transform: 'scale(1.2)'
                      }
                    }
                  }}>
                    <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                      <Box sx={{ mb: 2, '& .MuiSvgIcon-root': { fontSize: 48, transition: '0.3s' } }}>
                        {industry.icon}
                      </Box>
                      <Typography variant="h6" component="div" gutterBottom>
                        {industry.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {industry.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grow>
      </Container>
    </Box>
    </OutsideLayout>
  );
};

export default NationalAccount;
