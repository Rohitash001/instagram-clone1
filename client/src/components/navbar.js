import React from "react";

const Navbar = ()=>{
    return(
        <nav>
        <div className="nav-wrapper white">
          <a href="/" className="brand-logo left">Instagram</a>
          <ul id="nav-mobile" className="right ">
            <li><a href="/Login">Login</a></li>
            <li><a href="/Signup">signup</a></li>
            <li><a href="/Profile">Profile</a></li>
            <li><a href="/CreatePost">CreatePost</a></li>
          </ul>
        </div>
      </nav>
    )
}

export default Navbar;