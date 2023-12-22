import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) =>{
    const initialNotes = [
        {
          "_id": "656db3a1d80095531c8cfcd4",
          "user": "656b031e813f3f0499a0f455",
          "title": "my title",
          "description": "please wake up early",
          "tag": "personal",
          "date": "2023-12-04T11:10:25.729Z",
          "__v": 0
        },
        {
          "_id": "656db513d80095531c8cfcd6",
          "user": "656b031e813f3f0499a0f455",
          "title": "my title",
          "description": "please wake up early",
          "tag": "personal",
          "date": "2023-12-04T11:16:35.434Z",
          "__v": 0
        }
      ]
      const [notes,setNotes] = useState(initialNotes);
    return (
         <NoteContext.Provider value={{initialNotes,setNotes}}>
            {props.children}
         </NoteContext.Provider>
    )
}

export default NoteState;