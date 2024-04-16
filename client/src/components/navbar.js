import React, { useContext } from "react";
import { UserContext } from "../App";
const Navbar = ()=>{
  const {state,dispatch} = useContext(UserContext);
  const renderList = ()=>{
    if(state){
      return [
        <li><a href="/Profile">Profile</a></li>,
        <li><a href="/CreatePost">CreatePost</a></li>
      ]
    }
    else{
      return[ <li><a href="/Login">Login</a></li>,
      <li><a href="/Signup">signup</a></li>

      ]
    }
  }
    return(
        <nav>
        <div className="nav-wrapper white">
          <a href={state?"/":"/Login"} className="brand-logo left">Instagram</a>
          <ul id="nav-mobile" className="right ">
           {renderList()}
           
          </ul>
        </div>
      </nav>
    )
}

export default Navbar;