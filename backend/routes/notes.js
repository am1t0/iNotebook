const express = require('express');
const fetchuser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Notes = require('../models/Notes')

//  ROUTE 1: get all the notes GET: api/auth/fetchallnotes login required
router.get('/fetchallnotes',fetchuser,async (req,res)=>{
    try{
        const notes = await Notes.find({user:req.user.id})
        res.json(notes)
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Server error")
    }
    
})
//  ROUTE 2: adding the notes POST: api/auth/addnotes login required
router.post('/addnotes',fetchuser,
[
    body('title','Enter a valid title').isLength({min:3}),
    body('description','Description must be atleast 5 characters').isLength({min:5})
],async (req,res)=>{
       try{
    const {title,description,tag} = req.body;
     // if there are errors return the errors
     const result = validationResult(req);
     if (!result.isEmpty()) {
       return res.send({ errors: result.array() });
     }

     const notes = new Notes({
        title,description,tag,user:req.user.id
     })
     const savedNote = await notes.save();

    res.send(savedNote);
       }
       catch(error){
        console.error(error.message);
        res.status(500).send("Server error")
       }
    })

//  ROUTE 3: adding the notes PUT: api/auth/addnotes login required
router.put('/updatenotes/:id',fetchuser,async (req,res)=>{
    try{
      const {title,description,tag} = req.body;
      // Create a newnote object
      const newNote = {};
      if(title) {newNote.title = title};
      if(description) {newNote.description = description};
      if(tag) {newNote.tag = tag};

      // getting id of note that we want to update
      let note = await Notes.findById(req.params.id);
      if(!note) res.status(404).send("Not found");

      // verifying the user if it is the same one or different user
      if(note.user.toString()!=req.user.id){
        return res.status(401).send("Not allowed");
      }

      note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
      res.json({note})
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Server error")
    }
    
})

//  ROUTE 4: deleting existing Note using:DELETE api/auth/deletnote Login required
router.delete('/deletenotes/:id',fetchuser,async (req,res)=>{
  try{
    // getting id of note that we want to update
    let note = await Notes.findById(req.params.id);
    if(!note) res.status(404).send("Not found");

    // verifying the user if it is the same one or different user
    if(note.user.toString()!=req.user.id){
      return res.status(401).send("Not allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note has been deleted", note: note})
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("Server error")
  }
  
})

module.exports = router