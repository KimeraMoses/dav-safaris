import React from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationMenu.module.css";
import styles from "./NavDropDown.module.css";

const NavigationMenu = (props) => {
  const { menuOpen, setMenuOpen } = props;

  const NavMenuItem = ({ itemTitle, itemLink, ...props }) => {
    return (
      <li className={props.class} onClick={() => setMenuOpen(false)}>
        <NavLink
          to={itemLink}
          className={({ isActive }) =>
            classes.nav_link + (isActive ? ` ${classes.active}` : "")
          }
        >
          {itemTitle}
        </NavLink>
        {props.children}
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
        <NavMenuItem
          class={styles.dav__dropdown_wrapper}
          itemLink="/more-safaris"
          itemTitle="More Safaris"
        >
          <ul className={styles.dav_dropdown}>
            <NavMenuItem itemTitle="Botswana" itemLink="/botswana-safaris" />
            <NavMenuItem
              itemTitle="South Africa"
              itemLink="/south-africa-safaris"
            />
            <NavMenuItem itemTitle="Zimbabwe" itemLink="/zimbabwe-safaris" />
            <NavMenuItem itemTitle="Zambia" itemLink="/zambia-safaris" />
            <NavMenuItem itemTitle="Namibia" itemLink="/namibia-safaris" />
            <NavMenuItem itemTitle="Egypt" itemLink="/egypt-safaris" />

            <NavMenuItem
              itemTitle="Madagascar"
              itemLink="/madagascar-safaris"
            />
            <NavMenuItem
              itemTitle="Seychelles"
              itemLink="/seychelles-safaris"
            />
          </ul>
        </NavMenuItem>

        <NavMenuItem itemTitle="About Us" itemLink="/about-us" />
        <NavMenuItem itemTitle="Safari Updates" itemLink="/safari-updates" />
        <NavMenuItem itemTitle="Community" itemLink="/community-support" />
        <NavMenuItem itemTitle="Contact us" itemLink="/contact-us" />
      </ul>
    </div>
  );
};

export default NavigationMenu;
