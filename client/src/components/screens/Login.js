
import React,{useState,useContext} from "react";
import {Link,useNavigate} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'
const Login = ()=>{
    const {state,dispatch} = useContext(UserContext);
    const navigate = useNavigate();
  
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
          
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
           if(data.error)
           {
            
            M.toast({html:data.error,classes:"#d32f2f red darken-2"});
           }
           else{
            localStorage.setItem("jwt",data.token)
            localStorage.setItem("user",JSON.stringify(data.user))
            dispatch({type:"USER",payload:data.user})
            M.toast({html:"signed in success",classes:"#388e3c green darken-2"})
            navigate('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    
    }
return (
   <div className="card auth-card input-field">
    <h2>Instagram</h2>
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
>Signin</a>

<h5>
    <Link to="/signup">Don't have an account ?</Link>
</h5>
   </div>
)
}

export default Login;