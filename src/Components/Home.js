import React, { useContext } from 'react'
import NoteContext from '../context/Notes/NoteContext'

export default function Home() {
  const context = useContext(NoteContext);
  const {initialNotes,setNotes} = context;
  {console.log(initialNotes)}
  return (
    <div>
      <div className="container my-3">
      <h2>Add a note</h2>
      <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1"/>
  </div>
  <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
</div>
<div className="container">
<h2>Your Notes</h2>
{initialNotes.map((note)=>{
  return note.title;
})}
</div>
    </div>
  )
}
