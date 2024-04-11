import React,{useState} from "react";
import {Link,useNavigate} from 'react-router-dom'
import M from 'materialize-css'
const Signup= ()=>{
    const navigate = useNavigate();
    const [name,setName]  =useState("");
    const [password,setPassword]  =useState("");
    const [email,setEmail]  =useState("");
    const postData = ()=> {
        const validateEmail = (email) => {
            return email.match(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
          };

           if(!validateEmail(email))
           {
            M.toast({html:"invalid email",classes:"#d32f2f red darken-2"})
            return;
           }
          
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error)
           {
            M.toast({html:data.error,classes:"#d32f2f red darken-2"});
           }
           else{
            M.toast({html:data.message,classes:"#388e3c green darken-2"})
            navigate('/Login')
           }
        })
    
    }
return (
    <div className="mycard">
    <div className="card auth-card input-field">
   <h2>instagram</h2>
   <input
   type="text"
   placeholder="name"
   value={name}
   onChange={(e)=>
    setName(e.target.value)
  }
   />
   <input
   type="text"
   placeholder="email"
   value={email}
   onChange={(e)=>
    setEmail(e.target.value)
  }
   />
   
    <input
   type="text"
   placeholder="password"
   value={password}
   onChange={(e)=>
    setPassword(e.target.value)
  }
   />

<a className="waves-effect waves-light btn-small #42a5f5 blue darken-1"
onClick={()=>postData()}
>signup</a>

<h5>
    <Link to="/Login">Already have an account ?</Link>
</h5>
    </div>
</div>
)
}

export default Signup;