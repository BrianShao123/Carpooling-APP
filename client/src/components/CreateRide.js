import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import '../css/GoogleMap.css';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 40.917957003152985,
  lng: -73.12272353777752,
};

export default function CreateRide() {
  const { isLoaded } = useJsApiLoader({
    id: 'map',
    googleMapsApiKey: 'AIzaSyDI6m-Daz7gGJfNAx_x2tHJ7Muh6w51W6A',
  });

  const [map, setMap] = React.useState(null);
  const [tempMarker, setTempMarker] = React.useState(null);

  const onLoad = React.useCallback(
    function callback(map) {
      map.setZoom(15);
      setMap(map);
    },
    []
  );

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const createMarker = (event) => {
    const position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setTempMarker(position);
  };

  return (
    <Box sx={{ display: 'flex', height: '91vh', width: '100%' }}>
      <Box sx={{ width: '70%' }}>
        <Box id="map-overlay" sx={{ height: '100%', position: 'relative' }}>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={16}
              onLoad={onLoad}
              onUnmount={onUnmount}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                scaleControl: false,
              }}
              onClick={(e) => createMarker(e)}
            >
              {tempMarker && <Marker position={tempMarker} />}
              {/* Child components, such as markers, info windows, etc. */}
              <></>
            </GoogleMap>
          )}
        </Box>
      </Box>
      <Box sx={{ width: '30%' }}>
        {/* Right side content */}
        <Box sx={{ p: 2 }}>
          <TextField label="From" variant="outlined" fullWidth sx={{ mb: 2 }} />
          <TextField label="To" variant="outlined" fullWidth sx={{ mb: 2 }} />
          <TextField label="Date" variant="outlined" fullWidth sx={{ mb: 2 }} />
          <TextField label="Number of Seats" variant="outlined" fullWidth sx={{ mb: 2 }} />
          <Button variant="contained" fullWidth>
            Create Ride
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
