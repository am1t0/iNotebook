import React, { useContext } from 'react'
import NoteContext from '../context/Notes/NoteContext'
import NotesItem from './NotesItem';
import AddNote from './AddNote';

export default function Notes() {
    const context = useContext(NoteContext);
    const {notes,addNote} = context;
    return (
        <>
        <AddNote/>
        <div className="container my-3">
        <h2>Your Notes</h2>
              <div className="row my-3">
            {notes.map((note) => {
                return <NotesItem note={note} key={note._id}/>
            })}
              </div>
        </div>
        </>
    )
}
