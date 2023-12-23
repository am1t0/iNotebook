import React, { useContext } from 'react'
import NoteContext from '../context/Notes/NoteContext'
import NotesItem from './NotesItem';

export default function Notes() {
    const context = useContext(NoteContext);
    const { initialNotes, setNotes } = context;
    return (
        <div className="container my-3">
        <h2>Your Notes</h2>
              <div className="row my-3">
            {initialNotes.map((note) => {
                return <NotesItem note={note}/>
            })}
              </div>
        </div>
    )
}
