import React, {useState, useEffect} from 'react';
import MapBox from './MapBox';
import NotesList from './NotesList';
import Header from './Header';
import {db} from '../firebase-config';
import {collection, getDocs, addDoc} from 'firebase/firestore';
import { useAuth } from "../contexts/AuthContext";
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Form = styled.form`
    width: 100%;
    font-size: 30px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
`;

const Input = styled.input`
    width: 70vw;
    outline: none;
    background-color: white;
    border: 2px solid black;
    padding: 8px;
    border-radius: 4px;
    font-size: 20px;
    max-width: 500px;
`;

const Button = styled.button`
    border: none;
    background-color: #00337C;
    color: white;
    padding: 12px;
    width: 50vw;
    max-width: 300px;
    font-size: 20px;
    cursor: pointer;
    border-radius: 4px;
    transition: all 250ms ease-in-out;
    &:hover{
        transform: scale(1.02);
    }
`;

const ErrorMessage = styled.p`
    background-color: #F55050;
    color: white;
    text-align: center;
    padding: 8px;
    border-radius: 4px;
`;

function LandmarkRemark() {

    const [newLong, setNewLong] = useState("");
    const [newLat, setNewLat] = useState("");
    const [newRemark, setNewRemark] = useState("");
    const [notes, setNotes] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const notesCollectionRef = collection(db, "notes");

    const {currentUser} = useAuth();


    const getNotes = async () => {
      const data = await getDocs(notesCollectionRef);
      setNotes(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    }

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
      await getNotes();
    }

    useEffect(() => {

        getNotes()
        .then(() => setNotes((notes) => [...notes]))
        .catch((err) => console.log(err))
  
    },[]);

  return (
    <Container>
      <Header />
      <MapBox setNewLong={setNewLong} setNewLat={setNewLat} notes={notes}/>
      
      <Form onSubmit={createNote}>
        <Input type='text' placeholder='Add note' onChange={(e) => setNewRemark(e.target.value)}/>
        <Input type='text'  placeholder="Click on map to get new remark coordinates" value={newLong} onChange={(e) => setNewLong(e.target.value)} />
        <Input type='text'  placeholder="Click on map to get new remark coordinates" value={newLat} onChange={(e) => setNewLat(e.target.value)} />
        <Button>Add remark to location</Button>
      </Form>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <NotesList notes={notes} getNotes={getNotes} />
    </Container>
  );
}

export default LandmarkRemark;
