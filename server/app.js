const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000; //this is port
// zrV00XU3xby6khZr
const{MONGOURI} = require("./keys");
 require("./models/user");

 app. use(express.json());
 app.use(require("./routes/auth.js"));


mongoose.connect(MONGOURI)
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo ")
})
mongoose.connection.on('err',(err)=>{
    console.log("err connecting ",err)
})

app.listen(PORT,()=>{
    console.log(`server is listing on port ${PORT}`);
})