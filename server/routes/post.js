const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require("../middleware/requirelogin")
const Post = mongoose.model("Post");

router.post("/createpost",requirelogin,(req,res)=>{
    const {title,body} = req.body

    if(!title || !body){
        res.status(422).json({error:"please add all the fields"})
    }
    
    req.user.password = undefined;

    const post = new Post({
        title,
        body,
        postedBy:req.user

    })
    post.save().then(result=>{
        res.json({post:result});
    })
    .catch(err=>{
         console.log(err);
    })

})

module.exports = router
