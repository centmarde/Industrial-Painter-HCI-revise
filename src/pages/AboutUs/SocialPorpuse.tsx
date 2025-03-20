import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  useTheme,
  Card,
  CardContent
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../theme/theme';
import OutsideLayout from '../../layout/OutsideLayout';

// Placeholder for your actual image path
const socialPurposeImage = '/images/misc/visson.png';

const SocialPurpose: React.FC = () => {
  const theme = useTheme();
  
  return (
    <OutsideLayout>
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            mb: 5
          }}
        >
          <Box 
            component="img"
            src={socialPurposeImage}
            alt="Social Purpose"
            sx={{
              width: '30%',
              height: '30%',
              objectFit: 'contain',
            }}
          />
        </Box>
        
        <Typography 
          variant="h2" 
          gutterBottom 
          align="center"
          sx={{ 
            color: 'primary.main',
            fontWeight: 'bold',
            mb: 4
          }}
        >
          Social Purpose Statement
        </Typography>
        
        <Typography 
          variant="h5" 
          paragraph 
          align="center" 
          sx={{ mb: 6 }}
        >
          At Industrial Painter, we're committed to making a positive impact through our business practices.
          Our social purpose drives everything we do as we strive to create value for people, the environment, and our communities.
        </Typography>
        
        <Grid container spacing={4}>
          {/* PEOPLE Section */}
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                bgcolor: 'background.paper',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                  variant="h4" 
                  component="h3" 
                  gutterBottom
                  sx={{ color: 'primary.main', fontWeight: 'bold' }}
                >
                  PEOPLE
                </Typography>
                <Typography variant="body1">
                  We value our employees and clients as our most important assets. We provide fair wages, 
                  safe working conditions, and opportunities for growth and development. We believe in 
                  treating everyone with dignity and respect, and fostering an inclusive environment 
                  where diverse perspectives can thrive.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* ENVIRONMENT Section */}
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                bgcolor: 'background.paper',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                  variant="h4" 
                  component="h3" 
                  gutterBottom
                  sx={{ color: 'primary.main', fontWeight: 'bold' }}
                >
                  ENVIRONMENT
                </Typography>
                <Typography variant="body1">
                  We are committed to minimizing our environmental footprint through sustainable 
                  practices. This includes using eco-friendly materials, reducing waste, and 
                  implementing energy-efficient processes. We continuously innovate to find 
                  more environmentally responsible ways to deliver our services without compromising quality.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* COMMUNITY Section */}
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                bgcolor: 'background.paper',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                  variant="h4" 
                  component="h3" 
                  gutterBottom
                  sx={{ color: 'primary.main', fontWeight: 'bold' }}
                >
                  COMMUNITY
                </Typography>
                <Typography variant="body1">
                  We believe in giving back to the communities we serve. Through partnerships with 
                  local organizations, volunteer initiatives, and charitable donations, we strive 
                  to make a positive impact. We are committed to being good corporate citizens and 
                  supporting the social and economic well-being of our neighborhoods.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
    </OutsideLayout>
  );
};

const ThemedSocialPurpose: React.FC = () => (
  <ThemeProvider theme={theme}>
    <SocialPurpose />
  </ThemeProvider>
);

export default ThemedSocialPurpose;
