const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/rohitash/image/upload/v1713726430/ffq7y2cernwo7csgivjf.jpg"
    },
    followers:[{type:mongoose.Schema.Types.ObjectID , res:"User"}],
    following:[{type:mongoose.Schema.Types.ObjectID , res:"User"}],
})
 
mongoose.model("User",userSchema);