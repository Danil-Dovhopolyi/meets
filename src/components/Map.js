import React from 'react';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';

export default function Map({ meet, draggable, long, lat }) {
  const containerStyle = {
    width: '500px',
    height: '400px',
  };

  const onLoad = (marker) => {
    console.log('marker: ', marker);
  };
  const center = {
    lat: long,
    lng: lat,
  };

  const position = { lat: long, lng: lat };

  return (
    <LoadScript googleMapsApiKey="AIzaSyC20EWfCNO13dzUA-8fmWHneWfsncW9UeA">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <MarkerF
          draggable={draggable}
          onLoad={onLoad}
          position={position}
        ></MarkerF>
      </GoogleMap>
    </LoadScript>
  );
}
