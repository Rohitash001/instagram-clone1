import React from "react";
import {Link} from 'react-router-dom'

const Signup= ()=>{
return (
    <div className="mycard">
    <div className="card auth-card input-field">
   <h2>instagram</h2>
   <input
   type="text"
   placeholder="name"
   />
   <input
   type="text"
   placeholder="email"
   />
   
    <input
   type="text"
   placeholder="password"
   />

<a className="waves-effect waves-light btn-small #42a5f5 blue lighten-1">signup</a>

<h5>
    <Link to="/Login">Already have an account ?</Link>
</h5>
    </div>
</div>
)
}

export default Signup;