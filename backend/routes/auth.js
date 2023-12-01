const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/user')


router.post('/createUser',//array of validations
[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','enter a valid email').isEmail(),
    body('password').isLength({min:8})
],
async (req,res)=>{

  // if there are errors return the errors
    const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.send({ errors: result.array() });
  }

  // check whether user with the given email already exists
  try{
 // using async - await here as many methods are asynchronous i.e. "findOne"
    let user = await User.findOne({email:req.body.email})
  
    if(user){return res.status(400).json({error:"Sorry! a user with this email already exists"})}

    // preparing the password security 
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);

    // Creating a new user from request body
      user = await User.create({
      name: req.body.name,
      password: secPass,
      email:req.body.email })
  
      res.json(user)
  }
  // catching error if there is any in the server
  catch(error){
    console.error(error.message);
    res.status(500).send("Server error")
  }
  
})

module.exports = router