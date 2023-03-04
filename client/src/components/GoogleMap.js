import React from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import "../css/GoogleMap.css"

const containerStyle = {
    width: '100%',
  height: '0',
  paddingBottom: '100%',
  position: 'absolute',
    top: 0,
right: '0',
bottom: 0,
left: 0,

  };
  
  const center = {
    lat: 40.917957003152985,
    lng: -73.12272353777752
  };

export default function CreateRide() {

    const { isLoaded } = useJsApiLoader({
        id: 'map',
        googleMapsApiKey: "AIzaSyDI6m-Daz7gGJfNAx_x2tHJ7Muh6w51W6A"
      })

      const [selectMode, setSelectMode] = React.useState(null)
      const [map, setMap] = React.useState(null)
      const [tempMarker, editTemp] = React.useState(null);

      

      const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        //map.fitBounds(bounds);
        map.setZoom(15)
        setMap(map)
      }, [])
    
      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])

      const createMarker = (event) => {
        let position = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
          }
        console.log(event.fb)
        editTemp(position)
      }
  return (
    isLoaded ? (
        <div id="map-size">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={16}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{zoomControl: false, streetViewControl: false, mapTypeControl: false, fullscreenControl: false, scaleControl: false}}
          onClick={(e) => createMarker(e)}
        >
            {editTemp && <Marker position={tempMarker}/>}
          { /* Child components, such as markers, info windows, etc. */ }
          <></>
        </GoogleMap>
        </div>
    ) : <></>
  )
}
