import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import GroupIcon from '@mui/icons-material/Group';
import BuildIcon from '@mui/icons-material/Build';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SchoolIcon from '@mui/icons-material/School';
import HandshakeIcon from '@mui/icons-material/Handshake';
import OutsideLayout from '../../layout/OutsideLayout';

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(6, 0),
  backgroundColor: 'transparent',
}));

const SectionHeading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  position: 'relative',
  display: 'inline-block',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '60px',
    height: '4px',
    bottom: '-12px',
    left: 0,
    backgroundColor: theme.palette.primary.main,
  }
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  },
}));

const SupportItem = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const HeroBanner = styled(Box)(({ theme }) => ({
  backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/images/industrial-painting.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#fff',
  padding: theme.spacing(12, 2),
  textAlign: 'center',
  marginBottom: theme.spacing(6),
}));

const WhyFranchise: React.FC = () => {
  const navigate = useNavigate();
  
  const handleButtonClick = () => {
    navigate('/login');
  };

  return (
    <OutsideLayout>
    <Box>
      <HeroBanner>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            Why Franchise With Industrial Painter?
          </Typography>
          <Typography variant="h5" paragraph>
            Join the leader in industrial painting solutions
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            sx={{ mt: 3, fontWeight: 'bold' }}
            onClick={handleButtonClick}
          >
            Request Franchise Information
          </Button>
        </Container>
      </HeroBanner>

      {/* Section 1: Business Opportunity */}
      <SectionContainer>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <SectionHeading variant="h3" as="h2">
                This opportunity is NOT about picking up a paintbrush
              </SectionHeading>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'medium' }}>
                It's about running a professionally managed business.
              </Typography>
              <Typography paragraph>
                When you join Industrial Painter, you're stepping into a leadership role. You'll build and manage a team while we provide the systems, support, and expertise to help your business thrive.
              </Typography>
              <Typography paragraph>
                Our franchise owners focus on business development, customer relationships, and strategic growth—not on wielding paintbrushes themselves.
              </Typography>
              <Button 
                variant="contained" 
                sx={{ mt: 2 }}
                onClick={handleButtonClick}
              >
                Learn About Our Business Model
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box component="img" 
                src="/images/business-management.jpg" 
                alt="Professional Business Management" 
                sx={{ 
                  width: '100%', 
                  borderRadius: 2,
                  boxShadow: 8
                }} 
              />
            </Grid>
          </Grid>
        </Container>
      </SectionContainer>

      <Divider />

      {/* Section 2: Franchisee Stories */}
      <SectionContainer sx={{ bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <SectionHeading variant="h3" as="h2" sx={{ '&:after': { left: '50%', transform: 'translateX(-50%)' } }}>
              Hear Our Franchisees' Extraordinary Stories
            </SectionHeading>
            <Typography>
              Success stories from franchise owners across the country
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} md={4} key={item}>
                <FeatureCard>
                  <CardContent>
                    <Box 
                      component="img" 
                      src={`/images/franchisee-${item}.jpg`} 
                      alt={`Franchisee Success Story ${item}`}
                      sx={{ 
                        width: '100%', 
                        height: 200, 
                        objectFit: 'cover',
                        borderRadius: 1,
                        mb: 2
                      }}
                    />
                    <Typography variant="h5" component="h3" gutterBottom>
                      {item === 1 ? "From Corporate Job to Business Owner" : 
                       item === 2 ? "Building a Multi-Territory Empire" :
                       "Family Business Success Story"}
                    </Typography>
                    <Typography paragraph color="text.secondary">
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo."
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="bold">
                      — {item === 1 ? "John D., Franchise Owner since 2018" : 
                         item === 2 ? "Sarah & Mike T., Franchise Owners since 2016" :
                         "The Wilson Family, Franchise Owners since 2019"}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
          
          <Box textAlign="center" mt={4}>
            <Button 
              variant="outlined" 
              size="large"
              onClick={handleButtonClick}
            >
              View More Success Stories
            </Button>
          </Box>
        </Container>
      </SectionContainer>

      <Divider />

      {/* Section 3: Why Choose Industrial Painter */}
      <SectionContainer>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <SectionHeading variant="h3" as="h2" sx={{ '&:after': { left: '50%', transform: 'translateX(-50%)' } }}>
              Why Choose Industrial Painter?
            </SectionHeading>
            <Typography>
              Our competitive advantages set us apart in the industry
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {[
              { 
                icon: <BusinessCenterIcon fontSize="large" color="primary" />, 
                title: "Proven Business Model", 
                description: "Our streamlined operations and systems have been refined over years of success." 
              },
              { 
                icon: <GroupIcon fontSize="large" color="primary" />, 
                title: "Extensive Customer Base", 
                description: "Access to national accounts and a diverse industrial client portfolio." 
              },
              { 
                icon: <BuildIcon fontSize="large" color="primary" />, 
                title: "Specialized Expertise", 
                description: "Proprietary techniques and solutions for specialized industrial painting needs." 
              },
              { 
                icon: <SupportAgentIcon fontSize="large" color="primary" />, 
                title: "Comprehensive Support", 
                description: "From day one through the life of your business, our team is there to help you succeed." 
              },
              { 
                icon: <SchoolIcon fontSize="large" color="primary" />, 
                title: "Industry-Leading Training", 
                description: "Learn the business from the ground up with our extensive training program." 
              },
              { 
                icon: <HandshakeIcon fontSize="large" color="primary" />, 
                title: "Strong Brand Recognition", 
                description: "Leverage our established reputation for quality and reliability." 
              }
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper elevation={2} sx={{ p: 3, height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.03)' } }}>
                  <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                    <Box mb={2}>
                      {item.icon}
                    </Box>
                    <Typography variant="h5" component="h3" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {item.description}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SectionContainer>

      <Divider />

      {/* Section 4: Support & Lead Generation */}
      <SectionContainer sx={{ bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            <Grid item xs={12} md={5}>
              <SectionHeading variant="h3" as="h2">
                Support & Lead Generation
              </SectionHeading>
              <Typography paragraph>
                Our comprehensive support system ensures your business has everything it needs to succeed. From day-to-day operational guidance to strategic marketing support, we've got you covered.
              </Typography>
              <Box 
                component="img" 
                src="/images/support-team.jpg" 
                alt="Support Team" 
                sx={{ 
                  width: '100%', 
                  borderRadius: 2,
                  boxShadow: 4,
                  mt: 2
                }} 
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <List>
                <SupportItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={<Typography variant="h6">Management Support</Typography>}
                    secondary="Our dedicated franchise support team offers guidance on operations, hiring, financial management, and growth strategies. Regular check-ins ensure your business stays on track."
                  />
                </SupportItem>
                
                <SupportItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={<Typography variant="h6">Vendor Discounts & Recommendations</Typography>}
                    secondary="Access our network of vetted suppliers and enjoy exclusive pricing on equipment, materials, and services through our purchasing power. Save on everything from paint to vehicles."
                  />
                </SupportItem>
                
                <SupportItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={<Typography variant="h6">Lead Generation</Typography>}
                    secondary="Our multi-channel marketing approach delivers qualified leads to your business. From national accounts to local digital marketing campaigns, we help keep your pipeline full."
                  />
                </SupportItem>
                
                <SupportItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={<Typography variant="h6">Branded Materials & Uniforms</Typography>}
                    secondary="Professional, consistent branding across all touchpoints builds customer trust. We provide branded vehicle graphics, uniforms, marketing materials, and digital assets."
                  />
                </SupportItem>
              </List>
            </Grid>
          </Grid>
        </Container>
      </SectionContainer>

      <Divider />

      {/* Section 5: Technology and Training */}
      <SectionContainer>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box 
                component="img" 
                src="/images/training-tech.jpg" 
                alt="Technology and Training" 
                sx={{ 
                  width: '100%', 
                  borderRadius: 2,
                  boxShadow: 8
                }} 
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <SectionHeading variant="h3" as="h2">
                Technology and Training
              </SectionHeading>
              <Typography paragraph>
                Our proprietary systems and comprehensive training program give you the edge in the industrial painting market. We combine cutting-edge technology with proven methodologies.
              </Typography>
              <List>
                <SupportItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Comprehensive Initial Training"
                    secondary="Two-week intensive program covering operations, sales, marketing, and technical aspects."
                  />
                </SupportItem>
                <SupportItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Proprietary Management Software"
                    secondary="Custom-built solutions for estimates, job management, and customer relationship management."
                  />
                </SupportItem>
                <SupportItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Ongoing Education"
                    secondary="Regular webinars, annual conferences, and on-demand learning resources."
                  />
                </SupportItem>
              </List>
              <Button 
                variant="contained" 
                sx={{ mt: 2 }}
                onClick={handleButtonClick}
              >
                Explore Our Technology
              </Button>
            </Grid>
          </Grid>
        </Container>
      </SectionContainer>

      <Divider />

      {/* Section 6: Strategic Relationships */}
      <SectionContainer sx={{ bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <SectionHeading variant="h3" as="h2" sx={{ '&:after': { left: '50%', transform: 'translateX(-50%)' } }}>
              Strategic Relationships with Paint Manufacturers
            </SectionHeading>
            <Typography>
              Exclusive partnerships that benefit your business
            </Typography>
          </Box>
          
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography paragraph>
                  Industrial Painter has established strong relationships with the top paint manufacturers in the industry. These partnerships provide our franchisees with:
                </Typography>
                
                <Grid container spacing={3} mt={2}>
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <CheckCircleOutlineIcon color="primary" sx={{ mr: 1 }} />
                      <Typography fontWeight="medium">Competitive pricing advantages</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={2}>
                      <CheckCircleOutlineIcon color="primary" sx={{ mr: 1 }} />
                      <Typography fontWeight="medium">Early access to new products</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <CheckCircleOutlineIcon color="primary" sx={{ mr: 1 }} />
                      <Typography fontWeight="medium">Technical support hotline</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <CheckCircleOutlineIcon color="primary" sx={{ mr: 1 }} />
                      <Typography fontWeight="medium">Specialized training workshops</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" mb={2}>
                      <CheckCircleOutlineIcon color="primary" sx={{ mr: 1 }} />
                      <Typography fontWeight="medium">Co-marketing opportunities</Typography>
                    </Box>
                    <Box display="flex" alignItems="center">
                      <CheckCircleOutlineIcon color="primary" sx={{ mr: 1 }} />
                      <Typography fontWeight="medium">Volume rebate programs</Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 4 }}>
            {[1, 2, 3, 4, 5].map((partner) => (
              <Paper 
                key={partner}
                elevation={2} 
                sx={{ 
                  p: 3, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: 180,
                  height: 100,
                  filter: 'grayscale(1)',
                  transition: 'all 0.3s',
                  '&:hover': { 
                    filter: 'grayscale(0)',
                    transform: 'scale(1.05)',
                    boxShadow: 6
                  }
                }}
              >
                <Box 
                  component="img" 
                  src={`/images/partner-logo-${partner}.png`} 
                  alt={`Paint Partner ${partner}`}
                  sx={{ 
                    maxWidth: '100%', 
                    maxHeight: '80px'
                  }} 
                />
              </Paper>
            ))}
          </Box>
        </Container>
      </SectionContainer>

     
    </Box>
    </OutsideLayout>
  );
};

export default WhyFranchise;
