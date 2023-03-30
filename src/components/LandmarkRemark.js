import React, {useState, useEffect} from 'react';
import MapBox from './MapBox';
import NotesList from './NotesList';
import Header from './Header';
import {db} from '../firebase-config';
import {collection, getDocs, addDoc} from 'firebase/firestore';




function LandmarkRemark() {

    const [notes, setNotes] = useState([]);
    const notesCollectionRef = collection(db, "notes");

    const getNotes = async () => {
      const data = await getDocs(notesCollectionRef);
      setNotes(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }


  return (
    <div>
      <Header />
      <MapBox notes={notes} setNotes={setNotes}/>
      <NotesList notes={notes} getNotes={getNotes} />
    </div>
  );
}

export default LandmarkRemark;
