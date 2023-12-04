const express = require('express');
const fetchuser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Notes = require('../models/Notes')

//  ROUTE 1: get all the notes GET: api/auth/fetchallnotes 
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
//  ROUTE 2: adding the notes POST: api/auth/addnotes
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


module.exports = router