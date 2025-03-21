import React, { useState, useEffect, useRef } from 'react';
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
  useTheme,
  Tooltip,
  Switch,
  FormControlLabel
} from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import PlaceIcon from '@mui/icons-material/Place';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LockIcon from '@mui/icons-material/Lock';
import OutsideLayout from '../../layout/OutsideLayout';

interface Location {
  address: string;
  city: string;
  state: string;
  validated: boolean;
  lat?: number;
  lng?: number;
}

// Add global type definition for the initMap callback
declare global {
  interface Window {
    initMap: () => void;
  }
}

const Gmap: React.FC = () => {
  const theme = useTheme();
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [enableButtons, setEnableButtons] = useState<boolean>(false);
  
  // Add map related state and refs
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const apiKey = "AlzaSyQXsNE7PutrVqvZ7ngej9Ku5grw2PuqT_V";
  // Add state to track if map is initialized to prevent re-initialization
  const [isMapInitialized, setIsMapInitialized] = useState<boolean>(false);
  // Add a new state to track if the Google Maps API script has been loaded
  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);
  
  // Define default coordinates
  const defaultLat = 8.961334530855755;
  const defaultLng = 125.597603650452;

  useEffect(() => {
    // Set default location when component mounts
    setLocation({
      address: "Default Location",
      city: "Butuan City",
      state: "PH",
      validated: true,
      lat: defaultLat,
      lng: defaultLng
    });
  }, []);

  // Separate the map initialization from API loading
  useEffect(() => {
    // Define the global callback function for the Google Maps script
    window.initMap = () => {
      if (mapRef.current && !map && !isMapInitialized) {
        const defaultLocation = { lat: defaultLat, lng: defaultLng };
        
        // Create a basic map without API features first
        try {
          const mapOptions: google.maps.MapOptions = {
            center: defaultLocation,
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: true,
            zoomControlOptions: {
              position: google.maps.ControlPosition.RIGHT_CENTER
            },
          };
          
          const newMap = new google.maps.Map(mapRef.current, mapOptions);
          setMap(newMap);
          setIsMapInitialized(true);
          
          // Add default marker
          const defaultMarker = new google.maps.Marker({
            position: defaultLocation,
            map: newMap,
            title: "Default Location",
            animation: google.maps.Animation.DROP
          });
          
          setMarker(defaultMarker);
          
          // Add info window to default marker
          const infoContent = `
            <div style="padding: 8px; max-width: 250px;">
              <h3 style="margin: 0 0 8px; font-size: 16px; font-weight: bold;">
                Default Location
              </h3>
              <p style="margin: 0;">
                Butuan City, PH
              </p>
              <p style="margin: 8px 0 0; font-size: 12px; color: #666;">
                Coordinates: ${defaultLat.toFixed(6)}, ${defaultLng.toFixed(6)}
              </p>
            </div>
          `;
          
          const infoWindow = new google.maps.InfoWindow({
            content: infoContent
          });
          
          defaultMarker.addListener('click', () => {
            infoWindow.open(newMap, defaultMarker);
          });
          
          // Auto-open the info window for the default marker
          setTimeout(() => {
            infoWindow.open(newMap, defaultMarker);
          }, 500);
        } catch (error) {
          console.error("Error initializing map:", error);
        }
      }
    };

    // Only try to initialize if the script has been loaded or Google is already available
    if ((isScriptLoaded || window.google) && !isMapInitialized) {
      window.initMap();
    }
  }, [isScriptLoaded, map, isMapInitialized, defaultLat, defaultLng]);

  // Separate effect for loading the Google Maps script, only when enabled
  useEffect(() => {
    // Only load the script when the user enables the features and it hasn't been loaded yet
    if (enableButtons && !isScriptLoaded && !window.google) {
      const script = document.createElement('script');
      
      // Add a static version of the map first without API key
      if (!enableButtons) {
        script.src = 'https://maps.gomaps.pro/maps/api/js?libraries=geometry,places&callback=initMap';
      } else {
        // Only add the API key when the user has explicitly enabled features
        script.src = `https://maps.gomaps.pro/maps/api/js?key=${apiKey}&libraries=geometry,places&callback=initMap`;
      }
      
      script.async = true;
      script.defer = true;
      script.onload = () => setIsScriptLoaded(true);
      document.head.appendChild(script);
      
      return () => {
        // Cleanup function to remove the script if component unmounts
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, [enableButtons, isScriptLoaded, apiKey]);

  // Update map when location changes
  useEffect(() => {
    if (map && location && location.lat && location.lng) {
      const position = { lat: location.lat, lng: location.lng };
      
      // Update map center with smooth animation
      map.panTo(position);
      
      // Use smooth zoom instead of immediate zoom to prevent flickering
      const currentZoom = map.getZoom() || 4;
      if (currentZoom < 16) {
        const zoomStep = () => {
          const nextZoom = Math.min((map.getZoom() || 0) + 1, 16);
          map.setZoom(nextZoom);
          if (nextZoom < 16) {
            setTimeout(zoomStep, 150);
          }
        };
        
        setTimeout(zoomStep, 300); // Start zooming after panning begins
      }
      
      // Remove existing marker if any
      if (marker) {
        marker.setMap(null);
      }
      
      // Create a new marker with default Google Maps marker
      const newMarker = new google.maps.Marker({
        position: position,
        map: map,
        title: location.address,
        // Only animate for newly added markers, not when updating position
        animation: google.maps.Animation.DROP
      });
      
      setMarker(newMarker);
      
      // Add an info window with standard styling
      const infoContent = `
        <div style="padding: 8px; max-width: 250px;">
          <h3 style="margin: 0 0 8px; font-size: 16px; font-weight: bold;">
            ${location.address}
          </h3>
          <p style="margin: 0;">
            ${location.city}, ${location.state}
          </p>
          <p style="margin: 8px 0 0; font-size: 12px; color: #666;">
            Coordinates: ${location.lat?.toFixed(6)}, ${location.lng?.toFixed(6)}
          </p>
        </div>
      `;
      
      const infoWindow = new google.maps.InfoWindow({
        content: infoContent
      });
      
      newMarker.addListener('click', () => {
        infoWindow.open(map, newMarker);
      });
      
      // Delay opening the info window to avoid flicker
      setTimeout(() => {
        infoWindow.open(map, newMarker);
      }, 300);
    }
  }, [location, map]);

  const validateAddress = async () => {
    if (!address || !city) {
      setError('Please enter both address and city');
      return;
    }

    setIsLoading(true);
    setError(null);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "address": {
        "regionCode": "US",
        "locality": city,
        "addressLines": [
          address
        ]
      }
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow' as RequestRedirect
    };

    try {
      const response = await fetch(
        `https://addressvalidation.gomaps.pro/v1:validateAddress?key=${apiKey}`, 
        requestOptions
      );
      
      if (!response.ok) {
        throw new Error('Address validation failed');
      }
      
      const result = await response.json();
      console.log(result);
      
      // Extract location info from response - adapt based on actual API response structure
      // This is an example structure, adjust according to the actual API response
      const lat = result.result?.geocode?.location?.latitude;
      const lng = result.result?.geocode?.location?.longitude;
      
      if (lat && lng) {
        setLocation({
          address: address,
          city: city,
          state: 'US',
          validated: true,
          lat: lat,
          lng: lng
        });
      } else {
        // If the validation API doesn't return coordinates, use geocoding
        geocodeAddress();
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to validate address. Please try again.');
      // Try to geocode the address as a fallback
      geocodeAddress();
    } finally {
      setIsLoading(false);
    }
  };

  // Add geocoding function to convert address to coordinates
  const geocodeAddress = () => {
    if (!window.google) {
      setError('Maps API not loaded yet. Please try again later.');
      return;
    }
    
    const geocoder = new google.maps.Geocoder();
    const fullAddress = `${address}, ${city}, US`;
    
    geocoder.geocode({ address: fullAddress }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const position = results[0].geometry.location;
        
        setLocation({
          address: address,
          city: city,
          state: 'US',
          validated: true,
          lat: position.lat(),
          lng: position.lng()
        });
      } else {
        setError(`Could not find coordinates for this address. Status: ${status}`);
      }
    });
  };

  // Make sure getUserLocation doesn't cause reinitialization
  const getUserLocation = () => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            // If Google Maps is loaded, perform reverse geocoding
            if (window.google) {
              const geocoder = new google.maps.Geocoder();
              geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                if (status === 'OK' && results && results[0]) {
                  // Parse the address components
                  let streetAddress = '';
                  let cityName = '';
                  let stateName = '';
                  
                  results[0].address_components.forEach(component => {
                    if (component.types.includes('street_number') || component.types.includes('route')) {
                      streetAddress += component.long_name + ' ';
                    }
                    if (component.types.includes('locality')) {
                      cityName = component.long_name;
                    }
                    if (component.types.includes('administrative_area_level_1')) {
                      stateName = component.short_name;
                    }
                  });
                  
                  // Update location without reinitializing the map
                  setLocation(prevLocation => ({
                    address: streetAddress.trim() || results[0].formatted_address,
                    city: cityName || 'Unknown',
                    state: stateName || 'US',
                    validated: true,
                    lat,
                    lng
                  }));
                } else {
                  // Fallback if reverse geocoding fails
                  setLocation(prevLocation => ({
                    address: `Lat: ${lat}, Lng: ${lng}`,
                    city: 'Current Location',
                    state: 'US',
                    validated: true,
                    lat,
                    lng
                  }));
                }
                setIsLoading(false);
              });
            } else {
              // Fallback if Google Maps is not loaded
              setLocation(prevLocation => ({
                address: `Lat: ${lat}, Lng: ${lng}`,
                city: 'Current Location',
                state: 'US',
                validated: true,
                lat,
                lng
              }));
              setIsLoading(false);
            }
          } catch (error) {
            console.error('Error getting location details:', error);
            setError('Failed to get your location. Please try manual entry.');
            setIsLoading(false);
          }
        },
        (error) => {
          setIsLoading(false);
          setError('Unable to retrieve your location. Please enter it manually.');
          console.error('Geolocation error:', error);
        },
        { 
          // Add geolocation options for faster response
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 300000 // Accept cached position up to 5 minutes old
        }
      );
    } else {
      setError('Geolocation is not supported by your browser. Please enter your address manually.');
    }
  };

  // Handle the toggle switch change
  const handleToggleFeatures = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isEnabled = event.target.checked;
    setEnableButtons(isEnabled);
    
    // If enabling and the map isn't initialized with API features yet, we can reload
    if (isEnabled && !isScriptLoaded && !window.google) {
      // Map will be loaded with API key via the useEffect
      setIsMapInitialized(false);
    }
  };

  return (
    <OutsideLayout>
    <Box sx={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: theme.spacing(3),
      animation: 'fadeIn 0.5s ease-in-out',
      '@keyframes fadeIn': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
      }
    }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ 
          color: theme.palette.primary.main,
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 4
        }}
      >
        <PlaceIcon sx={{ fontSize: 35, verticalAlign: 'middle', mr: 1 }} />
        Find Your Location
      </Typography>
      
      {/* Map container with simple styling */}
      <Paper 
        elevation={4} 
        sx={{ 
          overflow: 'hidden',
          borderRadius: theme.shape.borderRadius,
          mb: 4,
          position: 'relative'
        }}
      >
        <Box 
          ref={mapRef} 
          sx={{ 
            height: '450px', 
            width: '100%',
          }}
        />
      </Paper>
      
      {/* API Conservation Notice */}
      <Alert 
        severity="info" 
        sx={{ mb: 3 }}
        action={
          <FormControlLabel
            control={
              <Switch 
                checked={enableButtons} 
                onChange={handleToggleFeatures}
                color="primary"
              />
            }
            label="Enable Features"
          />
        }
      >
        Location features are disabled to conserve API usage. Toggle the switch to enable them.
      </Alert>
      
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
                transform: enableButtons ? 'translateY(-4px)' : 'none',
                boxShadow: enableButtons ? theme.shadows[6] : theme.shadows[3]
              },
              opacity: enableButtons ? 1 : 0.7,
              position: 'relative'
            }}
          >
            {!enableButtons && (
              <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: theme.shape.borderRadius,
              }}>
                <Tooltip title="Enable features to use location services">
                  <LockIcon sx={{ fontSize: 48, color: 'rgba(0, 0, 0, 0.2)' }} />
                </Tooltip>
              </Box>
            )}
            
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<MyLocationIcon />}
                onClick={getUserLocation}
                disabled={isLoading || !enableButtons}
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
                    transform: enableButtons ? 'translateX(100%)' : 'translateX(-100%)',
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
                  disabled={!enableButtons}
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
                  disabled={!enableButtons}
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
                  disabled={isLoading || !enableButtons}
                  sx={{ py: 1.5 }}
                >
                  {isLoading ? 
                    <CircularProgress color="inherit" size={24} sx={{ mr: 1 }} /> : 
                    'Validate Address'
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
    </Box>
    </OutsideLayout>
  );
};

export default Gmap;
