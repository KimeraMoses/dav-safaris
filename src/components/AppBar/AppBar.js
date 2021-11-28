import React, { useState } from "react";

//===MUI IMPORTS===
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import { Hidden, IconButton, Button } from "@material-ui/core";

//===COMPONENT IMPORTS===
import classes from "./AppBar.module.css";
import DavLogo from "./DavLogo";
import NavigationMenu from "../Navigation/NavigationMenu";

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
              <a href="https://wa.link/iyj0rg" target="_blank" rel="noreferrer">
              <Button
                color="primary"
                variant="contained"
                endIcon={<WhatsAppIcon />}
                size="small"
              >
                
                Book Tours
              </Button>
              </a>
            </div>
          </Hidden>

          <Hidden smUp>
            <div className={classes.mobile_header_menu}>
            <a href="https://wa.link/iyj0rg" target="_blank" rel="noreferrer">
              <Button variant="contained" color="primary" size="small">
                <WhatsAppIcon />
              </Button>
              </a>
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
