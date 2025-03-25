import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Card, CardContent, CardActions, Button, 
         Chip, Avatar, TextField, MenuItem, FormControl, InputLabel, Select, 
         useTheme, useMediaQuery, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { jobListings, JobListing } from '../../data/jobListings';
import InsideLayout from '../../layout/InsideLayout';

const Career = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [displayedJobs, setDisplayedJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Simulate random fetch of job listings
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Shuffle the job listings randomly to simulate dynamic data
      const shuffledJobs = [...jobListings].sort(() => Math.random() - 0.5);
      setDisplayedJobs(shuffledJobs);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Navigate to consultation page
  const handleNavigateToConsultation = () => {
    navigate('/home/consultation');
  };
  
  // Get unique locations for filter dropdown
  const locations = Array.from(new Set(jobListings.map(job => job.location)));
  
  // Filter jobs based on search term and location
  const filteredJobs = displayedJobs.filter(job => {
    const matchesSearch = job.position.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLocation = locationFilter === '' || job.location === locationFilter;
    
    return matchesSearch && matchesLocation;
  });
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  return (
    <InsideLayout>
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center" 
                  sx={{ color: theme.palette.primary.main, mb: 4 }}>
        Career Opportunities
      </Typography>
      
      <Typography variant="h5" align="center" color="textSecondary" paragraph sx={{ mb: 6 }}>
        Find your next industrial painting role with top companies in the industry
      </Typography>
      
      {/* Search and Filter Section */}
      <Box sx={{ mb: 6, p: 3, backgroundColor: theme.palette.background.paper, borderRadius: 2, boxShadow: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search Jobs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="outlined"
              placeholder="Search by job title, company, or keyword"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Filter by Location</InputLabel>
              <Select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value as string)}
                label="Filter by Location"
              >
                <MenuItem value="">All Locations</MenuItem>
                {locations.map((location) => (
                  <MenuItem key={location} value={location}>{location}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      
      {/* Loading State */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Results Count */}
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            Found {filteredJobs.length} job opportunities
          </Typography>
          
          {/* Job Listings */}
          <Grid container spacing={4}>
            {filteredJobs.map((job) => (
              <Grid item key={job.id} xs={12}>
                <Card sx={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  boxShadow: 3,
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-4px)',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out'
                  }
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    p: 2, 
                    width: isMobile ? '100%' : 150,
                    backgroundColor: theme.palette.background.default
                  }}>
                    <Avatar
                      src={job.logo}
                      alt={job.companyName}
                      sx={{ width: 100, height: 100 }}
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <CardContent>
                      <Typography variant="h5" component="h2" gutterBottom color="primary">
                        {job.position}
                      </Typography>
                      
                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
                          <WorkIcon color="action" sx={{ mr: 1 }} />
                          <Typography variant="body2" color="textSecondary">
                            {job.companyName}
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationOnIcon color="action" sx={{ mr: 1 }} />
                          <Typography variant="body2" color="textSecondary">
                            {job.location}
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
                          <MonetizationOnIcon color="action" sx={{ mr: 1 }} />
                          <Typography variant="body2" color="textSecondary">
                            {job.salary}
                          </Typography>
                        </Grid>
                        
                        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarTodayIcon color="action" sx={{ mr: 1 }} />
                          <Typography variant="body2" color="textSecondary">
                            Posted: {formatDate(job.postedDate)}
                          </Typography>
                        </Grid>
                      </Grid>
                      
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        {job.description}
                      </Typography>
                      
                      <Typography variant="subtitle2" gutterBottom>
                        Requirements:
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {job.requirements.map((req, index) => (
                          <Chip 
                            key={index} 
                            label={req} 
                            size="small" 
                            sx={{ 
                                backgroundColor: theme.palette.secondary.light,
                                color: '#151515',
                              }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                    
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleNavigateToConsultation}
                      >
                        Apply Now
                      </Button>
                      <Button 
                        variant="outlined" 
                        color="secondary" 
                        onClick={handleNavigateToConsultation}
                      >
                        More Details
                      </Button>
                    </CardActions>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          {/* No results message */}
          {filteredJobs.length === 0 && !loading && (
            <Box sx={{ 
              textAlign: 'center', 
              p: 4, 
              backgroundColor: theme.palette.background.paper, 
              borderRadius: 2, 
              boxShadow: 2,
              mt: 4
            }}>
              <Typography variant="h6" color="textSecondary">
                No job opportunities found matching your criteria.
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Try adjusting your search or filter settings.
              </Typography>
            </Box>
          )}
        </>
      )}
      
      {/* Call to action */}
      <Box sx={{ 
        mt: 8, 
        p: 4, 
        backgroundColor: theme.palette.primary.main, 
        borderRadius: 2, 
        color: '#fff',
        textAlign: 'center'
      }}>
        <Typography variant="h4" gutterBottom>
          Don't see the right opportunity?
        </Typography>
        <Typography variant="body1" paragraph>
          Submit your resume to our talent pool and we'll contact you when relevant positions become available.
        </Typography>
        <Button 
          variant="contained" 
          size="large"
          onClick={handleNavigateToConsultation}
          sx={{ 
            backgroundColor: '#fff', 
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.grey[200]
            }
          }}
        >
          Join Our Talent Pool
        </Button>
      </Box>
    </Container>
    </InsideLayout>
  );
};

export default Career;
