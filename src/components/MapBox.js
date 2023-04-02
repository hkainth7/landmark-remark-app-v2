import React, {useEffect, useState} from 'react';
import Map, {Marker, NavigationControl, GeolocateControl, FullscreenControl, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {db} from '../firebase-config';
import {collection, addDoc} from 'firebase/firestore';
import { useAuth } from "../contexts/AuthContext";

function MapBox({notes, setNotes, getNotes}) {

  const [newLong, setNewLong] = useState("");
  const [newLat, setNewLat] = useState("");
  const [long, setLong] = useState(0);
  const [lat, setLat] = useState(0);
  const [newRemark, setNewRemark] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const notesCollectionRef = collection(db, "notes");

  const {currentUser} = useAuth();

    const createNote = async (e) => {
      e.preventDefault();

      if(newRemark===""){
        setErrorMessage("Remark field must not be empty");
      }else{
        try {
          await addDoc(notesCollectionRef, {
            remark: newRemark,
            long: newLong,
            lat: newLat,
            createdBy: currentUser.email
          })
          setErrorMessage("");
          
        } catch (error) {
          console.log(error);
        }
      }
      setNewRemark("");
      await getNotes();
    }

    useEffect(() => {

        getNotes()
        .then(() => setNotes((notes) => [...notes]))
        .catch((err) => console.log(err))
  
    },[]);
    
    const success = position => {
        setNewLat(position.coords.latitude);
        setNewLong(position.coords.longitude);
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


    const roundToFive = num => {
      return +(Math.round(num + "e+5") + "e-5");
    }

    
    const handleMapClick = (e) => {
        
        const longitude = roundToFive(e.lngLat.lng);
        const latitude = roundToFive(e.lngLat.lat);
        setNewLong(longitude);
        setNewLat(latitude);
        setLong(longitude);
        setLat(latitude);
        
    }
  
    return (
    <div className='mapbox-ui'>
      <Map
        logoPosition='bottom-right'
        mapboxAccessToken='pk.eyJ1IjoiaGthaW50aDciLCJhIjoiY2xmb2R0bHl6MHV0bjQ0bGt4YXhqd3MydyJ9.4U_TObIu2ZNsPrPsJ6vgeQ'
        initialViewState={{
          longitude: long,
          latitude: lat
        }}
        reuseMaps
        mapStyle='mapbox://styles/mapbox/streets-v12'
        onClick={handleMapClick}
        scrollZoom={false}
        attributionControl={false}
      >
        <Marker longitude={long} latitude={lat} />
        <NavigationControl position='top-right' />
        <GeolocateControl trackUserLocation showUserHeading position='top-left'/>
        <FullscreenControl position='bottom-left'/>
        {notes &&
          notes.map(({id, long, lat, remark, createdBy}) => (
            <Popup key={id} longitude={long} latitude={lat} closeButton={false} closeOnClick={false} >
              <p>{remark}</p>
              <p>Created by: {createdBy.split("@")[0]}</p>
            </Popup>
          ))
        }
        
      </Map>
      <div className='coords'>
        <p>Lat: {newLat}</p>
        <p>Long: {newLong}</p>
      </div>
      <form onSubmit={createNote}>
        <div>
          <input type='text' placeholder='Add note' onChange={(e) => setNewRemark(e.target.value)}/>
          <button>Add</button>
        </div>
      </form>
      {errorMessage && <p className='error-msg'>{errorMessage}</p>}
      
    </div>
  );
}

export default MapBox;
