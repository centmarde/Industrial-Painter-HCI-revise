import { Dispatch, SetStateAction, RefObject } from 'react';

// Define types
export interface Location {
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

// Function to initialize the Google Maps
export const initializeMap = (
  mapRef: RefObject<HTMLDivElement | null>,
  map: google.maps.Map | null,
  setMap: Dispatch<SetStateAction<google.maps.Map | null>>,
  setMarker: Dispatch<SetStateAction<google.maps.Marker | null>>,
  isMapInitialized: boolean,
  setIsMapInitialized: Dispatch<SetStateAction<boolean>>
): void => {
  // Define the global callback function for the Google Maps script
  window.initMap = () => {
    if (mapRef.current && !map && !isMapInitialized) {
      // Set default location to the Philippines coordinates
      const defaultLocation = { lat: 8.957816018448368, lng: 125.59743198938389 };
     
      const mapOptions: google.maps.MapOptions = {
        center: defaultLocation,
        zoom: 14, // Increased zoom level for better visibility of the location
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
      
      // Add a default marker at the specified location
      const defaultMarker = new google.maps.Marker({
        position: defaultLocation,
        map: newMap,
        title: "Default Location",
        animation: google.maps.Animation.DROP
      });
      
      setMarker(defaultMarker);
      
      // Add an info window for the default marker
      const infoContent = `
        <div style="padding: 8px; max-width: 250px;">
          <h3 style="margin: 0 0 8px; font-size: 16px; font-weight: bold;">
            Default Location
          </h3>
          <p style="margin: 8px 0 0; font-size: 12px; color: #666;">
            Coordinates: ${defaultLocation.lat.toFixed(6)}, ${defaultLocation.lng.toFixed(6)}
          </p>
        </div>
      `;
      
      const infoWindow = new google.maps.InfoWindow({
        content: infoContent
      });
      
      defaultMarker.addListener('click', () => {
        infoWindow.open(newMap, defaultMarker);
      });
      
      setIsMapInitialized(true);
    }
  };

  // Load the Google Maps script if it hasn't been loaded already
  if (!window.google && !isMapInitialized) {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBiyf0K2SL3k9iXh7cKB4mB7eo3g4jd39k&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    
    return;
  } else if (window.google && !isMapInitialized) {
    // If Google Maps API is already loaded, just initialize the map
    window.initMap();
  }
};

// Function to update map when location changes
export const updateMap = (
  map: google.maps.Map | null,
  location: Location | null,
  marker: google.maps.Marker | null,
  setMarker: Dispatch<SetStateAction<google.maps.Marker | null>>
): void => {
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
};

// Function to geocode an address
export const geocodeAddress = (
  address: string,
  city: string,
  setLocation: Dispatch<SetStateAction<Location | null>>,
  setError: Dispatch<SetStateAction<string | null>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>
): void => {
  if (!window.google) {
    setError('Maps API not loaded yet. Please try again later.');
    setIsLoading(false);
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
      setIsLoading(false);
    } else {
      setError(`Could not find coordinates for this address. Status: ${status}`);
      setIsLoading(false);
    }
  });
};

// Function to get current user location
export const getUserLocation = (
  setLocation: Dispatch<SetStateAction<Location | null>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<string | null>>
): void => {
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
                setLocation({
                  address: streetAddress.trim() || results[0].formatted_address,
                  city: cityName || 'Unknown',
                  state: stateName || 'US',
                  validated: true,
                  lat,
                  lng
                });
              } else {
                // Fallback if reverse geocoding fails
                setLocation({
                  address: `Lat: ${lat}, Lng: ${lng}`,
                  city: 'Current Location',
                  state: 'US',
                  validated: true,
                  lat,
                  lng
                });
              }
              setIsLoading(false);
            });
          } else {
            // Fallback if Google Maps is not loaded
            setLocation({
              address: `Lat: ${lat}, Lng: ${lng}`,
              city: 'Current Location',
              state: 'US',
              validated: true,
              lat,
              lng
            });
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

// Function to validate an address
export const validateAddress = (
  address: string,
  city: string,
  setError: Dispatch<SetStateAction<string | null>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  geocodeFn: () => void
): void => {
  if (!address || !city) {
    setError('Please enter both address and city');
    return;
  }

  setIsLoading(true);
  setError(null);

  // Use Google Maps Geocoding API directly
  geocodeFn();
};
