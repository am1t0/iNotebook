import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/Notes/NoteContext';

export default function About() {
  const data = useContext(NoteContext);
  useEffect(()=>{
    data.update();
    // eslint-disable-next-line
  },[])
  return (
    <div>
      <p>this is about {data.state.name} and his salary is : {data.state.salary}</p>
    </div>
  )
}
