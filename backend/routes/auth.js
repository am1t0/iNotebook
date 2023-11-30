const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/user')


router.post('/',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','enter a valid email').isEmail(),
    body('password').isLength({min:8})
],(req,res)=>{
    const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.send({ errors: result.array() });
  }

  User.create({
    name: req.body.name,
    password: req.body.password,
    email:req.body.email
  }).then(user => res.json(user))
  .catch(err=>{console.log(\err)
   res.json({error:"please enter unique value for email",message:err.message})});
})

module.exports = router