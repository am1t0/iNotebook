import React ,{useContext, useState} from 'react'
import NoteContext from '../context/Notes/NoteContext';
export default function AddNote(){
    const context = useContext(NoteContext);
    const {addNote} = context;
    const[note,setNote] = useState({title:"", description:"",tag:"default"});
    const onChange =(e)=>{
        setNote({...note,[e.target.name]: e.target.value})
    }
    const handleOnClick =(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
    }
    return (
        <div>
            <div className="container my-3">
                <h2>Add a note</h2>
                <form>
                    <div class="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" class="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange}/>
                    </div>
                    <div class="form-group">
                        <label htmlFor='description'>Description</label>
                        <input type="text" class="form-control" id="description" name='description' onChange={onChange}/>
                    </div>
                    <div class="form-group form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={handleOnClick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}
