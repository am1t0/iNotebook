import React from 'react'

export default function NotesItem(props) {
    const {note} = props;
  return (
    <div className="col md-3 my-2">
    <div className="card" style={{"width": "18rem"}}>
  <div className="card-body">
    <div className="d-flex align-items-center">
    <h5 className="card-title">{note.title}</h5>
    <i class="fa-solid fa-trash-can mx-2"></i>
    <i class="fa-solid fa-pen-to-square mx-2"></i>
    </div>
    <p className="card-text">{note.description}</p>
  </div>
</div>
</div>

  )
}
