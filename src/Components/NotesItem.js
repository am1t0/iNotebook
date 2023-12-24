import React, { useContext } from 'react'
import NoteContext from '../context/Notes/NoteContext';

export default function NotesItem(props) {
  const {note} = props;
  const context = useContext(NoteContext);
  const {deleteNote} = context;
  const handleOnClick=()=>{
     deleteNote(note._id)
  }
  return (
    <div className="col md-3 my-2">
    <div className="card" style={{"width": "18rem"}}>
  <div className="card-body">
    <div className="d-flex align-items-center">
    <h5 className="card-title">{note.title}</h5>
    <i class="fa-solid fa-trash-can mx-2" onClick={handleOnClick}></i>
    <i class="fa-solid fa-pen-to-square mx-2"></i>
    </div>
    <p className="card-text">{note.description}</p>
  </div>
</div>
</div>

  )
}
