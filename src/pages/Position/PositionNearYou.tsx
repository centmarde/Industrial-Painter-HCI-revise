import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Button,
  Divider,
  Chip,
  Paper,
  CircularProgress,
  ThemeProvider,
  useTheme,
  alpha
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import theme from '../../theme/theme';
import OutsideLayout from '../../layout/OutsideLayout';
import { useNavigate } from 'react-router-dom';

// Interface for painter profiles
interface Painter {
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  location: {
    city: string;
    state: string;
  };
  picture: {
    large: string;
  };
  experience?: string;
  specialty?: string;
}

// Interface for job listings
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  salary: string;
  type: string;
}

const PositionNearYou = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [painters, setPainters] = useState<Painter[]>([]);
  const [loading, setLoading] = useState(true);

  // Handle button clicks to navigate to login
  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  // Fetch random painter profiles
  useEffect(() => {
    const fetchPainters = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=3');
        const data = await response.json();
        
        // Add industrial painting specific details to the random users
        const enhancedPainters = data.results.map((painter: any, index: number) => {
          const specialties = ['Automotive Painting', 'Industrial Coatings', 'Powder Coating', 'Metal Finishing', 'Electrostatic Painting'];
          const experiences = ['5+ years', '8+ years', '12+ years'];
          
          return {
            ...painter,
            experience: experiences[index % experiences.length],
            specialty: specialties[index % specialties.length]
          };
        });
        
        setPainters(enhancedPainters);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching painter profiles:', error);
        setLoading(false);
      }
    };

    fetchPainters();
  }, []);

  // Mock job data
  const jobs: Job[] = [
    {
      id: 1,
      title: 'Industrial Spray Painter',
      company: 'AutoFinish Industries',
      location: 'Detroit, MI',
      description: 'Experienced spray painter needed for automotive parts. Must have knowledge of proper surface preparation and finishing techniques.',
      salary: '$24-28/hr',
      type: 'Full-time'
    },
    {
      id: 2,
      title: 'Senior Coating Specialist',
      company: 'MetalWorks Manufacturing',
      location: 'Pittsburgh, PA',
      description: 'Apply industrial coatings and finishes to metal products. Experience with epoxy coatings and powder coating required.',
      salary: '$62,000-75,000/year',
      type: 'Full-time'
    },
    {
      id: 3,
      title: 'Painting Technician',
      company: 'Industrial Solutions Inc.',
      location: 'Houston, TX',
      description: 'Seeking skilled painters for industrial equipment. Will be responsible for preparation, priming, and finishing.',
      salary: '$22-26/hr',
      type: 'Contract'
    },
    {
      id: 4,
      title: 'Apprentice Industrial Painter',
      company: 'Pacific Coatings',
      location: 'Seattle, WA',
      description: 'Entry-level position for individuals looking to start a career in industrial painting. Training provided.',
      salary: '$18-20/hr',
      type: 'Full-time'
    }
  ];

  return (
    <OutsideLayout>
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="lg">
          {/* Section 1: Opportunity is Knocking */}
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h2" component="h1" gutterBottom color="primary.main">
              Opportunity is Knocking
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Discover rewarding career opportunities in industrial painting near you
            </Typography>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                mt: 3, 
                backgroundImage: `linear-gradient(${alpha(theme.palette.common.black, 0.5)}, ${alpha(theme.palette.common.black, 0.7)}), url(https://images.unsplash.com/photo-1574189555774-7cbcd66d0e29?ixlib=rb-4.0.3)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: theme.palette.common.white,
                borderRadius: theme.shape.borderRadius
              }}
            >
              <Typography variant="h4" gutterBottom>
                The Industry Needs Your Skills
              </Typography>
              <Typography variant="body1" paragraph>
                Industrial painting is a growing field with consistent demand for skilled professionals. 
                With competitive salaries and opportunities for advancement, now is the perfect time to 
                join this dynamic industry.
              </Typography>
              <Button 
                variant="contained" 
                size="large" 
                sx={{ mt: 2 }}
                onClick={handleNavigateToLogin}
              >
                Learn More About Industrial Painting
              </Button>
            </Paper>
          </Box>

          <Divider sx={{ mb: 6 }} />

          {/* Section 2: Jump-start Your Career - List of Available Jobs */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h3" component="h2" gutterBottom color="primary.main">
              Jump-start Your Career
            </Typography>
            <Typography variant="h5" paragraph>
              Available Positions Near You
            </Typography>
            
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {jobs.map((job) => (
                <Grid item xs={12} md={6} key={job.id}>
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    transition: '0.3s', 
                    bgcolor: 'background.paper',
                    '&:hover': { 
                      transform: 'translateY(-5px)', 
                      boxShadow: 6 
                    } 
                  }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" component="div" gutterBottom color="primary.main">
                        {job.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        {job.company}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <LocationOnIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          {job.location}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.primary" paragraph>
                        {job.description}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                        <Chip 
                          label={job.salary} 
                          variant="outlined" 
                          color="primary" 
                        />
                        <Chip 
                          label={job.type} 
                          color="secondary" 
                        />
                      </Box>
                    </CardContent>
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button 
                        variant="contained" 
                        fullWidth
                        onClick={handleNavigateToLogin}
                      >
                        Apply Now
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
            
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button 
                variant="outlined" 
                color="primary" 
                size="large"
                onClick={handleNavigateToLogin}
              >
                View All Positions
              </Button>
            </Box>
          </Box>

          <Divider sx={{ mb: 6 }} />

          {/* Section 3: Painter Spotlights */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h3" component="h2" gutterBottom color="primary.main">
              Painter Spotlights
            </Typography>
            <Typography variant="h5" paragraph>
              Meet Some of Our Top Professionals
            </Typography>
            
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress color="primary" />
              </Box>
            ) : (
              <Grid container spacing={4} sx={{ mt: 2 }}>
                {painters.map((painter, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Card sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      transition: '0.3s', 
                      bgcolor: 'background.paper',
                      '&:hover': { 
                        transform: 'translateY(-5px)', 
                        boxShadow: 6 
                      } 
                    }}>
                      <CardMedia
                        component="img"
                        height="240"
                        image={painter.picture.large}
                        alt={`${painter.name.first} ${painter.name.last}`}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent>
                        <Typography variant="h5" component="div" gutterBottom color="text.primary">
                          {painter.name.first} {painter.name.last}
                        </Typography>
                        <Typography variant="subtitle1" color="primary" gutterBottom>
                          {painter.specialty}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          <strong>Experience:</strong> {painter.experience}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          <strong>Location:</strong> {painter.location.city}, {painter.location.state}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                          <Chip 
                            size="small" 
                            label="Top Performer" 
                            color="primary" 
                            variant="outlined"
                          />
                          <Chip 
                            size="small" 
                            label="Certified" 
                            color="secondary"
                          />
                        </Box>
                      </CardContent>
                      <Box sx={{ p: 2, pt: 0, mt: 'auto' }}>
                        <Button 
                          variant="outlined" 
                          fullWidth
                          color="primary"
                          onClick={handleNavigateToLogin}
                        >
                          View Profile
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
            
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="body1" paragraph color="text.secondary">
                Interested in being featured in our painter spotlights? 
                We're always looking for exceptional talent to showcase.
              </Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                onClick={handleNavigateToLogin}
              >
                Submit Your Profile
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
    </OutsideLayout>
  );
};

export default PositionNearYou;
