import { Box, Typography, Container, Paper, Button, Grid, Divider, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WorkIcon from '@mui/icons-material/Work';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BrushIcon from '@mui/icons-material/Brush';
import InfoIcon from '@mui/icons-material/Info';
import InsideLayout from '../../layout/InsideLayout';
import { useUserStore } from '../../stores/UserStore';
import { dashboardStats } from '../../data/dashboardData';
import { useCounterWithFluctuation } from '../../hooks/useCounterWithFluctuation';
import StatCard from '../../components/dashboard/StatCard';

const Home = () => {
  const user = useUserStore(state => state.user);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Using the fluctuation hook for all counters
  const activeUsers = useCounterWithFluctuation(
    dashboardStats.activeUsers, 
    200,  // Max active users
    50,   // Min active users
    4000, // 4 seconds interval
    dashboardStats.userFluctuation
  );
  
  const careersDistributed = useCounterWithFluctuation(
    dashboardStats.careers.distributedLastMonth,
    32,   // Max as specified
    20,   // Min value
    4000  // 4 seconds interval
  );
  
  const appointmentsPending = useCounterWithFluctuation(
    dashboardStats.appointments.pending,
    38,   // Max as specified
    25,   // Min value
    4000  // 4 seconds interval
  );
  
  const paintJobsCompleted = useCounterWithFluctuation(
    dashboardStats.paintJobs.completed,
    325,  // Max as specified
    280,  // Min value
    4000  // 4 seconds interval
  );

  return (
    <InsideLayout>
      <Box 
        sx={{ 
          minHeight: '100vh',
          background: (theme) => theme.palette.mode === 'light' 
            ? `linear-gradient(135deg, ${theme.custom.lighter} 0%, ${theme.custom.light} 100%)`
            : `linear-gradient(135deg, #202020 0%, #121212 100%)`,
          display: 'flex',
          flexDirection: 'column',
          padding: 3,
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {/* Welcome Banner */}
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              mb: 4, 
              borderRadius: 2,
              backgroundColor: (theme) => theme.palette.background.paper,
              backgroundImage: (theme) => theme.palette.mode === 'light' 
                ? 'linear-gradient(120deg, rgba(251, 133, 0, 0.1), rgba(255, 183, 3, 0.2))'
                : 'linear-gradient(120deg, rgba(251, 133, 0, 0.05), rgba(255, 183, 3, 0.1))',
            }}
          >
            <Typography 
              variant={isMobile ? "h4" : "h3"} 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                color: (theme) => theme.custom.darkest,
                fontSize: isMobile ? '1.75rem' : undefined,
                lineHeight: isMobile ? 1.2 : undefined
              }}
            >
              Welcome to Industrial Painter, {user?.displayName || 'User'}!
            </Typography>
            
            <Typography 
              variant={isMobile ? "body1" : "h6"} 
              sx={{ 
                mb: 2,
                fontSize: isMobile ? '0.95rem' : undefined
              }}
            >
              Your professional platform for industrial painting services and career opportunities
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="body1" sx={{ mb: 2 }}>
              Industrial Painter connects skilled professionals with businesses needing industrial painting expertise. 
              Whether you're looking to hire experienced painters or seeking employment in the industrial painting sector, 
              our platform streamlines the process for you.
            </Typography>
          </Paper>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Active Users Card */}
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Active Users"
                value={activeUsers}
                subtitle="Currently using the platform"
                icon={<PeopleAltIcon sx={{ color: '#4CAF50' }} />}
                color="#4CAF50"
                secondaryInfo="Updated in real-time"
              />
            </Grid>
            
            {/* Careers Card */}
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Careers Distributed"
                value={careersDistributed}
                subtitle="Jobs filled this month"
                icon={<WorkIcon sx={{ color: '#FB8500' }} />}
                color="#FB8500"
                secondaryInfo={`${dashboardStats.careers.total} total opportunities available`}
              />
            </Grid>
            
            {/* Appointments Card */}
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Appointments"
                value={appointmentsPending}
                subtitle="Awaiting processing"
                icon={<CalendarMonthIcon sx={{ color: '#2196F3' }} />}
                color="#2196F3"
                secondaryInfo={`${dashboardStats.appointments.totalToday} scheduled today`}
              />
            </Grid>
            
            {/* Paint Jobs Card */}
            <Grid item xs={12} sm={6} md={3}>
              <StatCard 
                title="Paint Jobs Completed"
                value={paintJobsCompleted}
                subtitle={`${dashboardStats.paintJobs.satisfaction} Client satisfaction`}
                icon={<BrushIcon sx={{ color: '#9C27B0' }} />}
                color="#9C27B0"
                secondaryInfo={`${dashboardStats.paintJobs.inProgress} projects in progress`}
              />
            </Grid>
          </Grid>

          {/* Main Dashboard Content */}
          <Grid container spacing={4}>
            {/* Careers Section */}
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3,
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WorkIcon sx={{ fontSize: isMobile ? 32 : 40, color: (theme) => theme.custom.darkest, mr: 2 }} />
                  <Typography 
                    variant={isMobile ? "h5" : "h4"} 
                    component="h2"
                    sx={{ 
                      fontSize: isMobile ? '1.4rem' : undefined,
                      lineHeight: isMobile ? 1.3 : undefined
                    }}
                  >
                    Explore Careers
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" paragraph>
                  Looking for new opportunities in industrial painting? Browse our extensive job listings from top employers in the industry.
                </Typography>
                <Typography variant="body1" paragraph>
                  • Full-time and contract positions
                </Typography>
                <Typography variant="body1" paragraph>
                  • Various skill levels from entry to expert
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  • Competitive compensation packages
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large" 
                  fullWidth
                  onClick={() => navigate('/careers')}
                >
                  View Career Opportunities
                </Button>
              </Paper>
            </Grid>

            {/* Appointments Section */}
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={2} 
                sx={{ 
                  p: 3,
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CalendarMonthIcon sx={{ fontSize: isMobile ? 32 : 40, color: (theme) => theme.custom.darkest, mr: 2 }} />
                  <Typography 
                    variant={isMobile ? "h5" : "h4"} 
                    component="h2"
                    sx={{ 
                      fontSize: isMobile ? '1.4rem' : undefined,
                      lineHeight: isMobile ? 1.3 : undefined
                    }}
                  >
                    Schedule Appointments
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body1" paragraph>
                  Need to discuss your industrial painting project? Schedule a consultation with our expert team.
                </Typography>
                <Typography variant="body1" paragraph>
                  • Flexible scheduling options
                </Typography>
                <Typography variant="body1" paragraph>
                  • Virtual or in-person meetings
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  • Personalized project assessment
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large" 
                  fullWidth
                  onClick={() => navigate('/appointments')}
                >
                  Book an Appointment
                </Button>
              </Paper>
            </Grid>

            {/* Additional Info Section */}
            <Grid item xs={12}>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 3, 
                  mt: 2,
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: (theme) => 
                    theme.palette.mode === 'light' ? 'rgba(255, 183, 3, 0.1)' : 'rgba(255, 183, 3, 0.05)',
                }}
              >
                <InfoIcon sx={{ fontSize: 24, mr: 2, color: (theme) => theme.custom.darkest }} />
                <Typography variant="body1">
                  Learn more about our services, expertise, and how we can help elevate your industrial painting projects.
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary"
                  sx={{ ml: 'auto' }}
                  onClick={() => navigate('/about')}
                >
                  Learn More
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </InsideLayout>
  );
};

export default Home;
