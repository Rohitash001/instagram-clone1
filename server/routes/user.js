const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requirelogin = require("../middleware/requirelogin")
const Post = mongoose.model("Post");
const User = mongoose.model("User");


router.get("/user/:id",requirelogin, async (req,res)=>{
try{
    const user = await User.findOne({ _id: req.params.id }).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const posts = await Post.find({ postedBy: req.params.id }).populate(
      "postedBy",
      "_id name"
    );
    res.json({ user, posts });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }

});


router.put("/follow", requirelogin, async (req, res) => {
    try {
      // Update the user being followed
      const followedUser = await User.findByIdAndUpdate(
        req.body.followId,
        { $push: { followers: req.user._id } },
        { new: true }
      );
  
      // Update the current user
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { $push: { following: req.body.followId } },
        { new: true }
      ).select("-password");
  
      // Send the updated user object as response
      res.json(updatedUser);
    } catch (err) {
      // Handle errors
      res.status(422).json({ error: err.message });
    }
  });

  router.put("/unfollow", requirelogin, async (req, res) => {
    try {
      // Update the user being unfollowed
      const unfollowedUser = await User.findByIdAndUpdate(
        req.body.unfollowId,
        { $pull: { followers: req.user._id } },
        { new: true }
      );
  
      // Update the current user
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { following: req.body.unfollowId } },
        { new: true }
      ).select("-password");
  
      // Send the updated user object as response
      res.json(updatedUser);
    } catch (err) {
      // Handle errors
      res.status(422).json({ error: err.message });
    }
  });



router.put("/updatepic", requirelogin, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { pic: req.body.pic } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});








module.exports = router