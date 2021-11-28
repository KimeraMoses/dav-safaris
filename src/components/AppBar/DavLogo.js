import React from "react";
import { Link } from 'react-router-dom'

//==COMPONENT IMPORTS===
import Logo from "../../assets/davLogo.png"
import classes from "./DavLogo.module.css";

const DavLogo = (props) => {
  const { setMenuOpen} = props
  return (
    <Link to="/" onClick={()=>setMenuOpen(false)}>
      <img className={classes.dav__logo} src={Logo} alt="Dav Safaris" />
    </Link>
  );
};
export default DavLogo;
