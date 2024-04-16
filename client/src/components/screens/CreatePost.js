import React,{useState,useEffect} from "react";
import {Link,useNavigate} from 'react-router-dom'
import M from 'materialize-css'



const CreatePost = ()=>{
  const navigate = useNavigate();
  const [title,setTitle]  =useState("");
  const [body,setBody] = useState("");
  const [image,setImage] = useState("");
  const [url,setUrl] = useState("");
  useEffect(()=>{
   if(url)
   {
    fetch("/createpost",{
      method:"post",
      headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
          
          title,
          body,
          pic:url
      })
  }).then(res=>res.json())
  .then(data=>{
      console.log(data);
     if(data.error)
     {
      
      M.toast({html:data.error,classes:"#d32f2f red darken-2"});
     }
     else{
      
      M.toast({html:"created post successfully",classes:"#388e3c green darken-2"})
      navigate('/')
     }
  }).catch(err=>{
      console.log(err)
  })
   }
  },[url])
  
  const postDetails = ()=>{
    const data = new FormData();
    data.append("file",image);
    data.append("upload_preset","instagram-clone")
    data.append("cloud_name","rohitash")
    fetch("https://api.cloudinary.com/v1_1/rohitash/image/upload",{
      method:"post",
      body:data
    })
    .then(res=>res.json())
    .then(data=>{
     setUrl(data.url)
    })
    .catch(err=>{
      console.log(err);
    })

    
  }
    return (
        <div className="card input-field"
        style={{margin:"10px auto",
        maxWidth:"500px",
        padding:"30px",
        textAlign:"center"}}>
            <input type="text" 
            placeholder="title"
            value = {title}
            onChange={(e)=>setTitle(e.target.value)}/>
            <input type="text" 
            placeholder="body"
            value={body}
            onChange={(e)=>setBody(e.target.value)}/>
            <div class="file-field input-field">
      <div className="btn #42a5f5 blue darken-1">
        <span>upload Image</span>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
        <a className="waves-effect waves-light btn-small #42a5f5 blue darken-1"
        onClick={()=>postDetails()}
        >upload post</a>
      </div>
     
    </div>

        </div>
    )
}

export default CreatePost;