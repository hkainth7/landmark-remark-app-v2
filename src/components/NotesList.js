import React, {useState} from "react";
import {db} from '../firebase-config';
import {doc, updateDoc, deleteDoc} from 'firebase/firestore';
import styled from "styled-components";

const Container = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: 70vw;
    max-width: 750px;
    margin: 0 auto;
`;

const Title = styled.h2`
    font-size: 20px;
    font-weight: 400;
`;

const Input = styled.input`
    flex: 1;
    outline: none;
    background-color: white;
    border: 2px solid black;
    padding: 8px;
    border-radius: 4px;
    font-size: 16px;
`;

const ListContainer = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const RemarkCard = styled.div`
    padding: 12px;
    border: 2px solid black;
    border-radius: 4px;
`;

const Remark = styled.p`
    margin: 0;
    font-size: 22px;
    font-weight: 500;
`;

const Button = styled.button`
    background-color: #00337C;
    border: none;
    color: white;
    padding: 8px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;
`;

const RemarkContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const RemarkControls = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`;



export default function NotesList({notes, getNotes}){

    const [newUpdatedRemark, setNewUpdatedRemark] = useState("");
    const [query, setQuery] = useState("")
    
    const getFilteredItems = (query, items) => {
        if(!query){
            return items;
        }
        return items.filter((item) => item.remark.includes(query));
    }

    const filteredItems = getFilteredItems(query, notes);

    const updateRemark = async (id) => {
        if(newUpdatedRemark === ""){
            console.log("edit field must not be empty");
            return;
        }else{
            const noteDoc = doc(db, "notes", `${id}`);
            const newRemark = {remark: newUpdatedRemark};
            try {
                await updateDoc(noteDoc, newRemark);
            } catch (error) {
                console.log(error.message);
            }
        }
        try {
            await getNotes();
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteRemark = async (id) => {
    
        const noteDoc = doc(db, "notes", `${id}`);
        try {
            await deleteDoc(noteDoc);
            await getNotes();
        } catch (error) {
            console.log(error.message);
        }
    }

    
    return(
        <Container>
            <Title>Remarks</Title>
            <Input type="text" placeholder='Search for remarks' onChange={(e) => setQuery(e.target.value)}/>
            <ListContainer>    
                {filteredItems?.map(({id, lat, long, createdBy, remark}) => (
                    <RemarkCard key={id}>
                        <RemarkContainer>
                            <Remark>{remark}</Remark>
                            <Button onClick={() => deleteRemark(id)}>Delete Remark</Button>
                        </RemarkContainer>
                            <p>Lat: {lat}</p>
                            <p>Long: {long}</p>
                            <p>CreatedBy: {createdBy}</p>
                        <RemarkControls>
                            <Input type="text" placeholder="edit remark" onChange={(e) => setNewUpdatedRemark(e.target.value)} />
                            <Button onClick={() => updateRemark(id)}>Edit Remark</Button>
                        </RemarkControls>
                    </RemarkCard>
                ))}
            </ListContainer>
        </Container>
    )
};