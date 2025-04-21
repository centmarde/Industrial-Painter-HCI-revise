import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  useTheme 
} from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import OutsideLayout from '../../layout/OutsideLayout';
import Locator from './Locator';
import {
  Location,
  initializeMap,
  updateMap,
  geocodeAddress,
  getUserLocation,
  validateAddress
} from './Gmapfunctions';

const Gmap: React.FC = () => {
  const theme = useTheme();
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  
  // Add map related state and refs
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  // Add state to track if map is initialized to prevent re-initialization
  const [isMapInitialized, setIsMapInitialized] = useState<boolean>(false);

  // Initialize Google Maps when component mounts
  useEffect(() => {
    initializeMap(mapRef, map, setMap, setMarker, isMapInitialized, setIsMapInitialized);
    
    return () => {
      // Cleanup function to remove the script and callback
      const script = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, [map, isMapInitialized]);

  // Update map when location changes
  useEffect(() => {
    updateMap(map, location, marker, setMarker);
  }, [location, map]);

  const handleValidateAddress = async () => {
    validateAddress(address, city, setError, setIsLoading, () => {
      geocodeAddress(address, city, setLocation, setError, setIsLoading);
    });
  };

  const handleGetUserLocation = () => {
    getUserLocation(setLocation, setIsLoading, setError);
  };

  return (
    <OutsideLayout>
      <Box sx={{ 
        maxWidth: '1500px', 
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
              height: 'calc(100vh - 180px)', // Changed from 450px to take up full viewport height minus header/spacing
              width: '100%',
            }}
          />
        </Paper>
        
        {/* Render Locator component and pass the necessary props */}
        <Locator
          location={location}
          isLoading={isLoading}
          error={error}
          address={address}
          city={city}
          setAddress={setAddress}
          setCity={setCity}
          validateAddress={handleValidateAddress}
          getUserLocation={handleGetUserLocation}
        />
      </Box>
    </OutsideLayout>
  );
};

export default Gmap;
