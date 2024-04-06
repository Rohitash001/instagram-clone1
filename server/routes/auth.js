const express = require("express");
const router = express.Router();


router.get("/",(req,res)=>{
    res.send("home route")
});

router.post("/signup",(req,res)=>{
  const {name,email,password} = req.body
  if(!name || !email || !password)
  {
    res.status(422).json({error:"please fill all the info"})
  }
  else{
  res.json({message:"post succesfully"})
  }


})

module.exports = router;