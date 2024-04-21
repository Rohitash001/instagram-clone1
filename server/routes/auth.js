const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User  = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt =  require("jsonwebtoken");
const {JWT_SECRET} = require("../keys");
const requirelogin = require("../middleware/requirelogin");


router.get("/protected",requirelogin,(req,res)=>{
  res.send("hello user");
})

router.post("/signup",(req,res)=>{
  const {name,email,password,pic} = req.body
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
        password:hashespassword,
        pic
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
      // res.json({message:"user saved successfully"})
      const token = jwt.sign({_id:savedUser._id},JWT_SECRET);
      const {_id,name,email,followers,following,pic} = savedUser;
       res.json({token,user:{_id,name,email,followers,following,pic}});
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