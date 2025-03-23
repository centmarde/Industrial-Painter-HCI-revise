import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Avatar,
  Button,
  useTheme,
  CircularProgress,
  Divider,
  Chip,
  useMediaQuery
} from '@mui/material';
import CallIcon from '@mui/icons-material/Call';
import GroupsIcon from '@mui/icons-material/Groups';
import WorkIcon from '@mui/icons-material/Work';
import InsideLayout from '../../layout/InsideLayout';

// Types for our data
interface RandomUser {
  name: {
    first: string;
    last: string;
    title: string;
  };
  email: string;
  phone: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  login: {
    uuid: string;
  };
  location: {
    city: string;
    country: string;
  };
}

interface ConsultationAgent {
  id: string;
  user: RandomUser;
  specialties: string[];
  yearsExperience: number;
}

// Specialties to randomly assign to agents
const agentSpecialties = [
  ["Industrial Coatings", "Floor Coatings", "Metal Surface Preparation"],
  ["Commercial Painting", "Epoxy Floors", "Protective Coatings"],
  ["Factory Recoating", "Equipment Painting", "Corrosion Prevention"],
  ["Rust Prevention", "Machinery Painting", "Quality Control"]
];

// Specialties for job consultants
const jobSpecialties = [
  ["Factory Painting Projects", "Industrial Equipment Coating", "Facility Maintenance"],
  ["Warehouse Floor Coating", "Industrial Sandblasting", "High-Performance Coatings"],
  ["Chemical Plant Painting", "Manufacturing Facility Painting", "Temperature Resistant Coatings"],
  ["Equipment Refurbishment", "Safety Line Marking", "Industrial Plant Maintenance"]
];

const Consultation: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [agents, setAgents] = useState<ConsultationAgent[]>([]);
  const [jobConsultants, setJobConsultants] = useState<ConsultationAgent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch 8 random users to use as consultation agents (4) and job consultants (4)
    const fetchAgents = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=8');
        const data = await response.json();
        
        if (data.results) {
          // Generate consultation agents with random specialties and experience (first 4)
          const consultationAgents = data.results.slice(0, 4).map((user: RandomUser, index: number) => {
            return {
              id: user.login.uuid,
              user,
              specialties: agentSpecialties[index],
              yearsExperience: Math.floor(Math.random() * 15) + 5 // 5-20 years experience
            };
          });
          
          // Generate job consultants with job specialties (last 4)
          const consultationJobs = data.results.slice(4, 8).map((user: RandomUser, index: number) => {
            return {
              id: user.login.uuid,
              user,
              specialties: jobSpecialties[index],
              yearsExperience: Math.floor(Math.random() * 15) + 5 // 5-20 years experience
            };
          });
          
          setAgents(consultationAgents);
          setJobConsultants(consultationJobs);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching consultation agents:', error);
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const handleCallAgent = (agent: ConsultationAgent) => {
    // In a real app, this would initiate a call or show contact information
    alert(`Calling ${agent.user.name.first} ${agent.user.name.last} at ${agent.user.phone}`);
  };

  // Function to render a card for both types of consultants
  const renderCard = (agent: ConsultationAgent) => (
    <Paper 
      elevation={3}
      sx={{
        p: 3,
        height: '100%',
        minHeight: '520px', // Set minimum height for consistent card size
        display: 'flex',
        flexDirection: 'column',
        borderRadius: theme.shape.borderRadius,
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
        background: theme.palette.mode === 'dark' 
          ? `linear-gradient(145deg, ${theme.palette.background.paper}, rgba(30, 30, 30, 0.7))` 
          : `linear-gradient(145deg, #ffffff, #f8f8f8)`,
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0px 12px 24px rgba(251, 133, 0, ${theme.palette.mode === 'dark' ? '0.2' : '0.1'})`,
          borderColor: theme.palette.primary.main,
        },
        aspectRatio: '3/4', // Maintain a consistent aspect ratio
        width: '100%',
        position: 'relative', // Add this for button positioning
        overflow: 'hidden', // Prevent content from overflowing
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <Avatar 
          src={agent.user.picture.large} 
          alt={`${agent.user.name.first} ${agent.user.name.last}`}
          sx={{ 
            width: 120, 
            height: 120, 
            mb: 2,
            border: `3px solid ${theme.palette.primary.main}`,
            boxShadow: `0 0 0 3px ${theme.palette.background.paper}`,
          }}
        />
        <Typography 
          variant="h5" 
          component="h3"
          sx={{ 
            fontWeight: 500,
            color: theme.palette.text.primary,
            textAlign: 'center',
            letterSpacing: '0.02em',
            fontSize: '1.2rem'
          }}
        >
          {agent.user.name.first} {agent.user.name.last}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="textSecondary"
          sx={{ 
            fontSize: '0.8rem',
            mb: 1,
            opacity: 0.8
          }}
        >
          {agent.user.location.city}
        </Typography>
        
        <Typography 
          variant="body1" 
          color="primary"
          sx={{ 
            fontWeight: 500,
            mb: 2,
            fontSize: '0.9rem'
          }}
        >
          {agent.yearsExperience} Yrs Experience
        </Typography>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      <Typography 
        variant="subtitle1" 
        sx={{ 
          fontWeight: 600,
          mb: 1.5,
          color: theme.palette.text.primary
        }}
      >
        Specialties:
      </Typography>
      
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        {agent.specialties.map((specialty, index) => (
          <Chip 
            key={index}
            label={specialty}
            color="primary"
            variant="outlined"
            size="small"
            sx={{ 
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(251, 133, 0, 0.1)' 
                  : 'rgba(251, 133, 0, 0.05)',
              }
            }}
          />
        ))}
      </Box>
      
      <Box sx={{ mt: 'auto', mb: 1, px: 0.5 }}>
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          startIcon={<CallIcon sx={{ fontSize: '1rem' }} />}
          onClick={() => handleCallAgent(agent)}
          sx={{
            py: 1,
            fontWeight: 500,
            fontSize: '0.9rem',
            textTransform: 'none',
            borderRadius: '4px',
            border: `1px solid ${theme.palette.primary.main}`,
            backgroundColor: 'transparent',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(251, 133, 0, 0.1)' 
                : 'rgba(251, 133, 0, 0.05)',
              borderColor: theme.palette.primary.main,
            }
          }}
        >
          Consult
        </Button>
      </Box>
    </Paper>
  );

  return (
    <InsideLayout>
      <Box 
        sx={{ 
          pt: isMobile ? 4 : 8, 
          pb: isMobile ? 6 : 10,
          backgroundColor: theme.palette.background.default 
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant={isMobile ? "h3" : "h2"} 
            align="center" 
            gutterBottom
            sx={{ 
              color: theme.palette.primary.main,
              mb: 2,
              fontWeight: 700,
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: isMobile ? 1 : 2,
              fontSize: isMobile ? '2rem' : undefined,
              lineHeight: isMobile ? 1.2 : undefined
            }}
          >
            <GroupsIcon sx={{ fontSize: isMobile ? 40 : 60 }} />
            Consultation Experts
          </Typography>
          
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ 
              color: theme.palette.text.secondary,
              mb: 6,
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            Our team of industrial painting specialists is ready to provide expert advice on your project
          </Typography>
          
          {loading ? (
            <Box display="flex" justifyContent="center" my={4}>
              <CircularProgress 
                color="primary" 
                size={60}
                thickness={4}
                sx={{ 
                  color: theme.palette.primary.main
                }}
              />
            </Box>
          ) : (
            <>
              <Grid container spacing={4} justifyContent="center">
                {agents.map((agent) => (
                  <Grid item xs={12} sm={6} md={3} key={agent.id} sx={{ display: 'flex' }}>
                    {renderCard(agent)}
                  </Grid>
                ))}
              </Grid>
              
              <Box sx={{ mt: 10, mb: 6 }}>
                <Divider />
              </Box>
              
              <Typography 
                variant={isMobile ? "h3" : "h2"} 
                align="center" 
                gutterBottom
                sx={{ 
                  color: theme.palette.primary.main,
                  mb: 2,
                  fontWeight: 700,
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: isMobile ? 1 : 2,
                  fontSize: isMobile ? '2rem' : undefined,
                  lineHeight: isMobile ? 1.2 : undefined
                }}
              >
                <WorkIcon sx={{ fontSize: isMobile ? 40 : 60 }} />
                Job Consultation
              </Typography>
              
              <Typography 
                variant="h6" 
                align="center" 
                sx={{ 
                  color: theme.palette.text.secondary,
                  mb: 6,
                  maxWidth: '800px',
                  mx: 'auto'
                }}
              >
                Consult with our job specialists for your industrial painting projects and facility maintenance
              </Typography>
              
              <Grid container spacing={4} justifyContent="center">
                {jobConsultants.map((consultant) => (
                  <Grid item xs={12} sm={6} md={3} key={consultant.id} sx={{ display: 'flex' }}>
                    {renderCard(consultant)}
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Container>
      </Box>
    </InsideLayout>
  );
};

export default Consultation;
