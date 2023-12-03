const express = require('express');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');

// creating the jwt secret 
const JWT_SECRET="amit@myboy";

// ROUTE 1
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

    //------------------- Creating a new user from request body------------------
      user = await User.create({
      name: req.body.name,
      password: secPass,
      email:req.body.email })
      
      // signing in jwt
      const data = {
         user:{
          id:user.id
         }
      }
      const authtoken = jwt.sign(data,JWT_SECRET)
    
      res.json({authtoken:authtoken})
  }
  // catching error if there is any in the server
  catch(error){
    console.error(error.message);
    res.status(500).send("Server error")
  }
 
})

// ROUTE 2:
//---------------------- creating the end point for the user's login--------------------
router.post('/login',//array of validations
[
    body('email','enter a valid email').isEmail(),
    body('password','password cannot be blank').exists()
],
async (req,res)=>{   

  // if there are errors return the errors
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.send({ errors: result.array() });
  }

  try{
  
  // checking whether user with given email and password exists or not
  const {email,password} = req.body;
  const user = await User.findOne({email});

  if(!user){
    return res.status(400).json({errors:[{msg:'Invalid credentials'} ]});
  }

  // comparing the passwords 
  const compPass = await bcrypt.compare(password,user.password)
  if(!compPass){
    return res.status(400).json({errors:[{msg:'Invalid credentials'} ]});
  }
  // generating token
  const data = {
    user:{
     id:user.id
    }
 }
 const authtoken = jwt.sign(data,JWT_SECRET)

 res.json({authtoken:authtoken})
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("Server error")
  }
})

// ROUTE 3: get loggedin user's detail using POST:"api/auth/getuser".Login required
router.post("/getUser",fetchuser, async (req,res)=> {
try {
  const id = req.user.id;
  const user = await User.findOne({_id: id}).select("-password")
  res.send(user)
} catch (error) {
  console.error(error.message);
  res.status(500).send("Server error")
}
})
module.exports = router