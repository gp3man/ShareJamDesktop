import React from "react";
import { NavLink } from "react-router-dom";
const NavBar =()=>{
  return(
    <div className="NavBar">
      <NavLink to={'/'}> Main </NavLink>
    </div>
  )
}
export default NavBar;
