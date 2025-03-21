import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  useTheme,
  Paper,
  Divider
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SearchIcon from '@mui/icons-material/Search';
import DescriptionIcon from '@mui/icons-material/Description';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import OutsideLayout from '../../layout/OutsideLayout';

const TheProcess: React.FC = () => {
  const theme = useTheme();

  // Process steps data
  const steps = [
    {
      number: 1,
      title: 'Inquiry',
      description: 'Begin your journey by submitting an inquiry. We\'ll provide you with initial information about our franchise opportunities.',
      icon: <AssignmentIcon fontSize="large" />
    },
    {
      number: 2,
      title: 'Initial Research',
      description: 'Learn about our business model, investment requirements, and territory availability to determine if it\'s a good fit for you.',
      icon: <SearchIcon fontSize="large" />
    },
    {
      number: 3,
      title: 'FDD Review',
      description: 'Review our Franchise Disclosure Document (FDD) which provides detailed information about the franchise system and requirements.',
      icon: <DescriptionIcon fontSize="large" />
    },
    {
      number: 4,
      title: 'Validation',
      description: 'Speak with our existing franchise owners to validate your understanding and get insights from their experiences.',
      icon: <VerifiedUserIcon fontSize="large" />
    },
    {
      number: 5,
      title: 'Meet the Team Day',
      description: 'Visit our headquarters to meet the support team and get a feel for our company culture and operations.',
      icon: <GroupsIcon fontSize="large" />
    },
    {
      number: 6,
      title: 'Award Franchise',
      description: 'Once approved, sign the franchise agreement and join our team as a new franchise owner ready to begin training.',
      icon: <EmojiEventsIcon fontSize="large" />
    }
  ];

  return (
    <OutsideLayout>
    <Box 
      sx={{ 
        py: 8, 
        bgcolor: theme.palette.background.default
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            color="primary"
            sx={{ fontWeight: 700 }}
          >
            The Road to Ownership
          </Typography>
          <Typography 
            variant="h5" 
            color="text.secondary" 
            sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
          >
            Our proven process to guide you from initial inquiry to becoming a successful franchise owner
          </Typography>
          <Divider sx={{ width: '100px', mx: 'auto', borderColor: theme.palette.primary.main, borderWidth: 2 }} />
        </Box>

        <Grid container spacing={4}>
          {steps.map((step) => (
            <Grid item xs={12} sm={6} md={4} key={step.number}>
              <Card 
                elevation={3}
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                <Box 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    p: 2, 
                    bgcolor: theme.palette.primary.main,
                    color: 'white'
                  }}
                >
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      bgcolor: 'white',
                      color: theme.palette.primary.main,
                      fontWeight: 'bold',
                      mr: 2
                    }}
                  >
                    {step.number}
                  </Paper>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                    Step {step.number}: {step.title}
                  </Typography>
                </Box>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'center', 
                      color: theme.palette.primary.main, 
                      my: 2 
                    }}
                  >
                    {step.icon}
                  </Box>
                  <Typography variant="body1">{step.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
    </OutsideLayout>
  );
};

export default TheProcess;
