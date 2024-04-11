import React from "react";


const CreatePost = ()=>{
    return (
        <div className="card input-field"
        style={{margin:"10px auto",
        maxWidth:"500px",
        padding:"30px",
        textAlign:"center"}}>
            <input type="text" placeholder="title"/>
            <input type="text" placeholder="body"/>
            <div class="file-field input-field">
      <div className="btn #42a5f5 blue darken-1">
        <span>upload Image</span>
        <input type="file"/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
        <a className="waves-effect waves-light btn-small #42a5f5 blue darken-1">upload post</a>
      </div>
     
    </div>

        </div>
    )
}

export default CreatePost;