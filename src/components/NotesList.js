import React, {useState} from "react";
import {db} from '../firebase-config';
import {doc, updateDoc, deleteDoc} from 'firebase/firestore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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
        <div className="notes-list">
            <input type="text" placeholder='Search for remarks' onChange={(e) => setQuery(e.target.value)}/>
            <ul>    
                {filteredItems?.map(({id, lat, long, createdBy, remark}) => (
                    <li key={id}>
                        <div>
                            <p>{remark}</p>
                            <DeleteIcon onClick={() =>  deleteRemark(id)} className="delete-icon"/>
                        </div>
                        <div className="info">
                            <p>Lat: {lat}</p>
                            <p>Long: {long}</p>
                        </div>
                        <div className="edit-container">
                            <input type="text" placeholder="edit remark" onChange={(e) => setNewUpdatedRemark(e.target.value)} />
                            <EditIcon className="edit-icon" onClick={() => updateRemark(id)}>Edit Remark</EditIcon>
                        </div>
                        <p className="created-by">CreatedBy: {createdBy}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
};