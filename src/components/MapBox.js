import React, {useEffect, useState} from 'react';
import Map, {Marker, NavigationControl, GeolocateControl, FullscreenControl, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function MapBox({setNewLong, setNewLat, notes}) {

    const [long, setLong] = useState(0);
    const [lat, setLat] = useState(0);
    
    const success = position => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
    }
    
    const error = () => {
        console.log('failed to load location');
    }

    useEffect(() => {
      if(!navigator.geolocation) {
          console.log("Geolocation is not supported by your browser");
        } else {
          navigator.geolocation.getCurrentPosition(success, error);
      }
    }, []);

    
    const handleMapClick = (e) => {
        
        const longitude = e.lngLat.lng;
        const latitude = e.lngLat.lat;
        setNewLong(longitude);
        setNewLat(latitude);
        setLong(longitude);
        setLat(latitude);
        
    }
  
    return (
    <>
      <Map
        mapboxAccessToken='pk.eyJ1IjoiaGthaW50aDciLCJhIjoiY2xmb2R0bHl6MHV0bjQ0bGt4YXhqd3MydyJ9.4U_TObIu2ZNsPrPsJ6vgeQ'
        style={{
          height: "500px",
          width: "100%"

        }}
        initialViewState={{
          longitude: long,
          latitude: lat
        }}
        mapStyle='mapbox://styles/mapbox/streets-v12'
        onClick={handleMapClick}
      >
        <Marker longitude={long} latitude={lat} />
        <NavigationControl position='bottom-right' />
        <GeolocateControl trackUserLocation showUserHeading />
        <FullscreenControl />
        {notes &&
          notes.map(({id, long, lat, remark, createdBy}) => (
            <Popup key={id} longitude={long} latitude={lat} closeButton={false} closeOnClick={false} >
              <p>{remark}</p>
              <p>{createdBy.split("@")[0]}</p>
            </Popup>
          ))
        }
      </Map>
    </>
  );
}

export default MapBox;
