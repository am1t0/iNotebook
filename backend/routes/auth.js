const express = require('express');

const router = express.Router();
const User = require('../models/user')


router.post('/',(req,res)=>{

    console.log(req.body)
    const user = User(req.body);
    user.save()
    console.log("hello");
    res.send(req.body)
    
})

module.exports = router