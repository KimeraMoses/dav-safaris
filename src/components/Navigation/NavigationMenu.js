import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationMenu.module.css";

const NavigationMenu = (props) => {
  const { menuOpen, setMenuOpen } = props;

  const NavMenuItem = ({ itemTitle, itemLink }) => {
    return (
      <li className={classes.menu_item} onClick={() => setMenuOpen(false)}>
        <NavLink
          to={itemLink}
          className={({ isActive }) =>
            classes.nav_link + (isActive ? ` ${classes.active}` : "")
          }
        >
          {itemTitle}
        </NavLink>
      </li>
    );
  };

  return (
    <div
      className={`${classes.dav__navbar_wrapper} ${
        menuOpen ? classes.menuOpen : ""
      }`}
    >
      <ul className={`${classes.nav_menu} ${menuOpen ? classes.active : ""}`}>
        <NavMenuItem itemTitle="Home" itemLink="/" />
        <NavMenuItem itemTitle="Uganda" itemLink="/uganda-safaris" />
        <NavMenuItem itemTitle="Kenya" itemLink="/kenya-safaris" />
        <NavMenuItem itemTitle="Tanzania" itemLink="/tanzania-safaris" />
        <NavMenuItem itemTitle="Rwanda" itemLink="/rwanda-safaris" />
        <NavMenuItem itemTitle="About Us" itemLink="/about-us" />
        <NavMenuItem itemTitle="Safari Updates" itemLink="/safari-updates" />
        <NavMenuItem itemTitle="Community" itemLink="/community-support" />
        <NavMenuItem itemTitle="Contact us" itemLink="/contact-us" />
      </ul>
    </div>
  );
};

export default NavigationMenu;
