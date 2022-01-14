import React, { useState } from "react";

//===MUI IMPORTS===
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Hidden, IconButton, Button } from "@material-ui/core";

//===COMPONENT IMPORTS===
import classes from "./AppBar.module.css";
import DavLogo from "./DavLogo";
import NavigationMenu from "../Navigation/NavigationMenu";
import { Link } from "react-router-dom";

const AppBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Toolbar id="dav__back_to_top_anchor">
        <div className={classes.dav__AppBar_wrapper}>
          <div className={classes.dav__AppBar_logo_Wrapper}>
            <DavLogo setMenuOpen={setMenuOpen}/>
          </div>

          <div className={classes.dav__AppBar_spacer} />

          <Hidden xsDown>
            <div className={classes.dav__action_btn_wrapper}>
              <NavigationMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
              <Link to="/login">
              <Button
                color="primary"
                variant="contained"
                endIcon={<LockOpenIcon />}
                size="small"
              >
                
                Login
              </Button>
              </Link>
            </div>
          </Hidden>

          <Hidden smUp>
            <div className={classes.mobile_header_menu}>
            <Link to="/login">
              <Button variant="contained" color="primary" size="small">
                <LockOpenIcon />
              </Button>
              </Link>
              <IconButton
                size="large"
                onClick={() => setMenuOpen(!menuOpen)}
                className={classes.menu_btn_toggle}
              >
                {menuOpen ? (
                  <CloseIcon fontSize="large" />
                ) : (
                  <MenuIcon fontSize="large" />
                )}
              </IconButton>
            </div>
          </Hidden>
        </div>
      </Toolbar>
      <Hidden smUp>
      <div className={classes.navbar_mobile_menu}>
        <NavigationMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>
      </Hidden>
    </>
  );
};
export default AppBar;
