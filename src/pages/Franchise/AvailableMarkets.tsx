import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardActionArea, 
  Divider,
  useTheme,
  alpha,
  Paper
} from '@mui/material';
import { 
  Public as PublicIcon,
  LocationOn as LocationOnIcon,
  TravelExplore as TravelExploreIcon,
  ArrowForward as ArrowForwardIcon 
} from '@mui/icons-material';
import OutsideLayout from '../../layout/OutsideLayout';

const MarketCard = ({ name, icon }: { name: string, icon: React.ReactNode }) => {
  const theme = useTheme();
  
  return (
    
    <Grid item xs={12} sm={6} md={4}>
      <Card 
        elevation={2} 
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: `0 10px 20px ${alpha(theme.palette.primary.main, 0.2)}`,
            '& .card-icon': {
              color: theme.palette.primary.main,
              transform: 'scale(1.1)',
            },
            '& .arrow-icon': {
              opacity: 1,
              transform: 'translateX(0)',
            }
          }
        }}
      >
        <CardActionArea sx={{ height: '100%', p: 1 }}>
          <CardContent sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            height: '100%'
          }}>
            <Box 
              className="card-icon"
              sx={{ 
                mb: 2, 
                color: theme.palette.text.secondary,
                transition: 'all 0.3s ease',
                fontSize: '2rem'
              }}
            >
              {icon}
            </Box>
            <Typography variant="h6" component="div" gutterBottom>
              {name}
            </Typography>
            <Box 
              sx={{ 
                mt: 'auto', 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'center' 
              }}
            >
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ mr: 1 }}
              >
                Learn more
              </Typography>
              <ArrowForwardIcon 
                className="arrow-icon"
                sx={{ 
                  fontSize: '1rem', 
                  opacity: 0.5,
                  transform: 'translateX(-5px)',
                  transition: 'all 0.3s ease'
                }} 
              />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
   
  );
};

const SectionHeader = ({ title, icon }: { title: string, icon: React.ReactNode }) => {
  const theme = useTheme();
  
  return (
   
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        mb: 4,
        pb: 2,
        borderBottom: `2px solid ${theme.palette.primary.main}`
      }}
    >
      <Box 
        sx={{ 
          color: theme.palette.primary.main,
          mr: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {icon}
      </Box>
      <Typography variant="h4" component="h2" fontWeight="bold">
        {title}
      </Typography>
    </Box>

  );
};

const AvailableMarkets = () => {
  const theme = useTheme();
  
  // Featured countries
  const featuredCountries = [
    "Australia", "Brazil", "France",
    "Germany", "Japan", "Mexico",
    "Singapore", "United Kingdom", "United Arab Emirates"
  ];
  
  // US States
  const usStates = [
    "California", "Florida", "New York",
    "Texas", "Illinois", "Pennsylvania",
    "Ohio", "Georgia", "Michigan"
  ];
  
  // Canadian Cities
  const canadianCities = [
    "Toronto", "Vancouver", "Montreal"
  ];

  return (
    <OutsideLayout>
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography 
          variant="h2" 
          component="h1" 
          fontWeight="bold"
          sx={{ 
            mb: 2,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Available Markets
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ maxWidth: '800px', mx: 'auto' }}
        >
          Discover franchise opportunities across the globe. Expand your business with our proven model.
        </Typography>
      </Box>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 6, 
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${theme.palette.background.paper})`,
          borderLeft: `5px solid ${theme.palette.primary.main}`
        }}
      >
        <SectionHeader 
          title="Featured Available Markets" 
          icon={<PublicIcon fontSize="large" />} 
        />
        
        <Grid container spacing={3}>
          {featuredCountries.map((country, index) => (
            <MarketCard 
              key={index} 
              name={country} 
              icon={<PublicIcon fontSize="large" />} 
            />
          ))}
        </Grid>
      </Paper>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 6, 
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${theme.palette.background.paper})`,
          borderLeft: `5px solid ${theme.palette.secondary.main}`
        }}
      >
        <SectionHeader 
          title="Available Markets in the United States" 
          icon={<LocationOnIcon fontSize="large" />} 
        />
        
        <Grid container spacing={3}>
          {usStates.map((state, index) => (
            <MarketCard 
              key={index} 
              name={state} 
              icon={<LocationOnIcon fontSize="large" />} 
            />
          ))}
        </Grid>
      </Paper>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          borderRadius: 3,
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${theme.palette.background.paper})`,
          borderLeft: `5px solid ${theme.custom.darkest}`
        }}
      >
        <SectionHeader 
          title="Available Markets in Canada" 
          icon={<TravelExploreIcon fontSize="large" />} 
        />
        
        <Grid container spacing={3}>
          {canadianCities.map((city, index) => (
            <MarketCard 
              key={index} 
              name={city} 
              icon={<TravelExploreIcon fontSize="large" />} 
            />
          ))}
        </Grid>
      </Paper>
    </Container>
    </OutsideLayout>
  );
};

export default AvailableMarkets;
