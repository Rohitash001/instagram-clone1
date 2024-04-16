import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
const Navbar = ()=>{
  const {state,dispatch} = useContext(UserContext);
  const renderList = ()=>{
    if(state){
      return [
        <li><Link to="/Profile">Profile</Link></li>,
        <li><Link to="/CreatePost">CreatePost</Link></li>
      ] 
    }
    else{
      return[ <li><Link to="/Login">Login</Link></li>,
      <li><Link to="/Signup">signup</Link></li>

      ]
    }
  }
    return(
        <nav>
        <div className="nav-wrapper white">
          <Link to={state?"/":"/Login"} className="brand-logo left">Instagram</Link>
          <ul id="nav-mobile" className="right ">
           {renderList()}
           
          </ul>
        </div>
      </nav>
    )
}

export default Navbar;