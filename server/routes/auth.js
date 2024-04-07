const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User  = mongoose.model("User");
const bcrypt = require("bcryptjs");



router.post("/signup",(req,res)=>{
  const {name,email,password} = req.body
  if(!name || !email || !password)
  {
     return res.status(422).json({error:"please fill all the info"})
  }
  
  User.findOne({email:email})
  .then((savedUser)=>{
    if(savedUser)
    {
       return res.status(422).json({error:"user already exists with this email"})
    }
    bcrypt.hash(password,12)
    .then(hashespassword=>{
      const user = new User({
        name,
        email,
        password:hashespassword
      })
  
      user.save()
      .then(user=>{
        return res.json({message:"saved successfully"});
      })
      .catch(err=>{
        console.log(err);
      })
    })
    
  })
  .catch(err=>{
    console.log(err);
  })


})

router.post("/signin",(req,res)=>{
  const {email,password} = req.body

  if(!email || !password)
  {
    return res.status(422).json({error:"please fill all the info"})
  }

  User.findOne({email:email})
  .then(savedUser=>{
    if(!savedUser)
    {
      return res.status(422).json({error:"invalid email or password"})
    }
    bcrypt.compare(password,savedUser.password)
    .then(doMatch=>{
      if(doMatch)
      {
      res.json({message:"user saved successfully"})
      }
      else{
        return res.status(422).json({error:"invalid email or password"})
      }
    })
    .catch(err=>{
      console.log(err);
    })
  })



})

module.exports = router;