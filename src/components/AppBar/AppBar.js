import React, { useState } from "react";

//===MUI IMPORTS===
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { Hidden, IconButton } from "@material-ui/core";

//===COMPONENT IMPORTS===
import classes from "./AppBar.module.css";
import DavLogo from "./DavLogo";
import NavigationMenu from "../Navigation/NavigationMenu";

const AppBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  // const { user } = useSelector((state) => state.auth);
  // const [auth, setAuth] = React.useState(true);
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const open = Boolean(anchorEl);
  // const username = user && user.username && user.username.split(" ");

  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // let userImage = "";
  // if (username && username.length > 1) {
  //   userImage =
  //     username &&
  //     username[0] &&
  //     username[0].charAt(0) + username &&
  //     username[1] &&
  //     username[1].charAt(0);
  // } else {
  //   userImage = username && username[0] && username[0].charAt(0);
  // }
  return (
    <>
      <Toolbar id="dav__back_to_top_anchor">
        <div className={classes.dav__AppBar_wrapper}>
          <div className={classes.dav__AppBar_logo_Wrapper}>
            <DavLogo setMenuOpen={setMenuOpen} />
          </div>

          <div className={classes.dav__AppBar_spacer} />

          <Hidden xsDown>
            <div className={classes.dav__action_btn_wrapper}>
              <NavigationMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
              {/* {isLoggedIn ? (
                <div>
                   <Avatar onClick={handleMenu} >{userImage}</Avatar>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>My DashBoard</MenuItem>
                      <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                  </div>
              ) : (
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
              )} */}
            </div>
          </Hidden>

          <Hidden smUp>
            <div className={classes.mobile_header_menu}>
              {/* {isLoggedIn ? (
                  <div>
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                    </Menu>
                  </div>
              ) : (
                <Link to="/login">
                  <Button variant="contained" color="primary" size="small">
                    <LockOpenIcon />
                  </Button>
                </Link>
              )} */}
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
