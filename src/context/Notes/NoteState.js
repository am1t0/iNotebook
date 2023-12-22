import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) =>{
    const s1 = {
        "name":"Amit",
        "age":22,
        "salary":"3 Lacs"
    }
    const [state,setState] = useState(s1);
    const update=()=>{
        setTimeout(()=>{
            setState({
                "name":"Anuj",
                "age":21,
                "salary":"2 Lacs"
            });
        },1000)
    }
    return (
         <NoteContext.Provider value={{state,update}}>
            {props.children}
         </NoteContext.Provider>
    )
}

export default NoteState;