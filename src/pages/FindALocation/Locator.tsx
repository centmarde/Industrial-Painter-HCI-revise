import React from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Alert,
  useTheme
} from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import PlaceIcon from '@mui/icons-material/Place';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface Location {
  address: string;
  city: string;
  state: string;
  validated: boolean;
  lat?: number;
  lng?: number;
}

interface LocatorProps {
  location: Location | null;
  isLoading: boolean;
  error: string | null;
  address: string;
  city: string;
  setAddress: (address: string) => void;
  setCity: (city: string) => void;
  validateAddress: () => void;
  getUserLocation: () => void;
}

const Locator: React.FC<LocatorProps> = ({
  location,
  isLoading,
  error,
  address,
  city,
  setAddress,
  setCity,
  validateAddress,
  getUserLocation
}) => {
  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            height: '100%',
            borderRadius: theme.shape.borderRadius,
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[6]
            }
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<MyLocationIcon />}
              onClick={getUserLocation}
              disabled={isLoading}
              fullWidth
              sx={{
                py: 1.5,
                fontWeight: 'bold',
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.3s',
                },
                '&:hover::after': {
                  transform: 'translateX(100%)',
                }
              }}
            >
              {isLoading ? 
                <CircularProgress color="inherit" size={24} sx={{ mr: 1 }} /> : 
                'Use My Current Location'
              }
            </Button>
          </Box>
          
          <Divider sx={{ mb: 3, '&::before, &::after': { borderColor: theme.palette.primary.light } }}>
            <Typography variant="body2" color="textSecondary" sx={{ px: 1 }}>OR</Typography>
          </Divider>
          
          <Typography 
            variant="h6" 
            sx={{ mb: 2, color: theme.palette.primary.main }}
          >
            Enter Address Manually
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="address"
                label="Street Address"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. 1600 Amphitheatre Pkwy"
                InputProps={{
                  startAdornment: <PlaceIcon color="action" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="city"
                label="City"
                variant="outlined"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Mountain View"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                fullWidth
                startIcon={<LocationSearchingIcon />}
                onClick={validateAddress}
                disabled={isLoading}
                sx={{ py: 1.5 }}
              >
                {isLoading ? 
                  <CircularProgress color="inherit" size={24} sx={{ mr: 1 }} /> : 
                  'Find Address'
                }
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={6}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            height: '100%',
            borderRadius: theme.shape.borderRadius,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: location ? 'flex-start' : 'center',
            alignItems: 'center',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[6]
            }
          }}
        >
          {error && (
            <Alert 
              severity="error" 
              variant="filled" 
              sx={{ 
                width: '100%', 
                mb: 2, 
                animation: 'shake 0.5s',
                '@keyframes shake': {
                  '0%, 100%': { transform: 'translateX(0)' },
                  '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
                  '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
                }
              }}
            >
              {error}
            </Alert>
          )}
          
          {location ? (
            <Card 
              variant="outlined" 
              sx={{ 
                width: '100%',
                backgroundColor: theme.palette.background.paper,
                borderColor: theme.palette.primary.main,
                borderWidth: 2,
                animation: 'fadeIn 0.5s ease-in-out'
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckCircleOutlineIcon 
                    color="primary" 
                    sx={{ fontSize: 28, mr: 1 }} 
                  />
                  <Typography 
                    variant="h5" 
                    component="h3" 
                    color="primary"
                  >
                    Found Location
                  </Typography>
                </Box>
                
                <Divider sx={{ mb: 2 }} />
                
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={4}>
                    <Typography variant="body2" color="textSecondary">
                      Address:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1" fontWeight="medium">
                      {location.address}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={4}>
                    <Typography variant="body2" color="textSecondary">
                      City:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="body1" fontWeight="medium">
                      {location.city}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={4}>
                    <Typography variant="body2" color="textSecondary">
                      Status:
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography 
                      variant="body1" 
                      fontWeight="medium"
                      sx={{ 
                        color: location.validated ? theme.palette.success.main : theme.palette.warning.main
                      }}
                    >
                      {location.validated ? 'Validated' : 'Not Validated'}
                    </Typography>
                  </Grid>
                  
                  {location.lat && location.lng && (
                    <>
                      <Grid item xs={4}>
                        <Typography variant="body2" color="textSecondary">
                          Coordinates:
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="body1" fontWeight="medium">
                          {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                        </Typography>
                      </Grid>
                    </>
                  )}
                </Grid>
              </CardContent>
            </Card>
          ) : (
            <Box sx={{ textAlign: 'center', p: 3 }}>
              <Typography 
                variant="h6" 
                color="textSecondary" 
                sx={{ mb: 2 }}
              >
                No Location Selected
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Please use your current location or enter an address manually to see the details here.
              </Typography>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Locator;
