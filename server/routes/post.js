const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require("../middleware/requirelogin")
const Post = mongoose.model("Post");

router.get("/allpostes",requirelogin,(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .then(posts=>{
       
        res.json({posts});
    })
    .catch(err=>{
     console.log(err);
    })
})

router.get("/mypost",requirelogin,(req,res)=>{
    Post.find({postedBy:req.user._id})
    .populate("postedBy","_id name")
    .then(mypost=>{
        res.json({mypost});
    })
    .catch(err=>{
        console.log(err);
       })

})
router.post("/createpost",requirelogin,(req,res)=>{
    const {title,body,pic} = req.body

    if(!title || !body || !pic){
        res.status(422).json({error:"please add all the fields"})
    }
    
    req.user.password = undefined;

    const post = new Post({
        title,
        body,
        photo:pic,
        postedBy:req.user

    })
    post.save().then(result=>{
        res.json({post:result});
    })
    .catch(err=>{
         console.log(err);
    })

})

router.put("/like",requirelogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
    $push:{likes:req.user._id}
    
}
,{new:true
}).then((result)=>{
    
        return res.json(result)
    
    })

.catch((err)=>{
    console.log(err);
     return res.status(422).json({error:err})
})
})


router.put("/unlike",requirelogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
    $pull:{likes:req.user._id}
},{
    new:true
}).then((result)=>{
    
        return res.json(result)
    
    })

.catch((err)=>{
     return res.status(422).json({error:err})
})
})

router.put("/comment",requirelogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
    $push:{comments:comment}
    
}
,{new:true
}).populate("comments.postedBy","_id name")
.populate("postedBy","_id name")
.then((result)=>{
    
        return res.json(result)
    
    })

.catch((err)=>{
    console.log(err);
     return res.status(422).json({error:err})
})
})

router.delete("/deletepost/:postId",requirelogin, async (req,res)=>{
    try{
   const post = await Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    
      
    if(!post)
    {
        ({error:"post not found"})
    }
    if (post.postedBy._id.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: "Unauthorized access" });
      }
  
      const result = await post.deleteOne();
      res.json(result);
      
    } catch(err){
        return res.status(422).json({error:err}) 
    }

//    Post.findOne({_id:req.params.postId})
//    .populate({path:"PostedBy"},"_id")
//    .then(post=>{
//     if(!post)
//     {
//         return res.status(403).json({error:"post not found"})
//     }
//     if (post.postedBy._id.toString() === req.user._id.toString()) {
//               post.remove()
//               .then(result=>{
//                 res.send(result);
//               }).catch(err=>{
//                 console.log(err);
//               })
//               }
    
//    }).catch((err)=>{
//     console.log(err);
//      return res.status(422).json({error:err})
// })
})

router.get("/getsubpost",requirelogin,(req,res)=>{
    Post.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .then(posts=>{
       
        res.json({posts});
    })
    .catch(err=>{
     console.log(err);
    })
})


module.exports = router
