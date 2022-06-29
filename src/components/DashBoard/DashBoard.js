import { Paper } from "@material-ui/core";
import React from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import classes from "./DashBoard.module.css";
import CardMembershipIcon from "@material-ui/icons/CardMembership";
import DashboardIcon from "@material-ui/icons/Speed";
import AddLocationIcon from "@material-ui/icons/AddLocationOutlined";
import GroupAddOutlinedIcon from "@material-ui/icons/GroupAddOutlined";
import BookOutlinedIcon from "@material-ui/icons/BookOutlined";

const DashBoard = () => {
  const location = useLocation();
  const DashMenuTitle = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  let menuTitle = "";
  switch (location.pathname) {
    case `/dashboard/${DashMenuTitle}`:
      menuTitle = DashMenuTitle.replace(/-/g, " ");
      break;
    default:
      menuTitle = "DashBoard";
      break;
  }

  if (menuTitle === "user") {
    menuTitle = "DashBoard";
  }

  const DashBoardMenuItem = (props) => {
    return (
      <NavLink
        className={({ isActive }) =>
          classes.dav__dashboard_menu_item_wrapper +
          (isActive ? ` ${classes.dav__selected_menu_item}` : "")
        }
        to={`/dashboard/${props.menuItemLink}`}
        end
      >
        <div className={classes.dav__dashboard_menu_item_icon_wrapper}>
          {props.menuItemIcon}
        </div>
        <div className={classes.dav__dashboard_menu_item_title_wrapper}>
          {props.menuItemTitle}
        </div>
      </NavLink>
    );
  };

  return (
    <div className={classes.dav__dashboard_wrapper}>
      <Paper className={classes.dav__dashboard_wrapper_inner}>
        <div className={classes.dav__dashboard_menu_items}>
          <ul>
            <li>
              <DashBoardMenuItem
                menuItemLink="user"
                menuItemTitle="Dashboard"
                menuItemIcon={<DashboardIcon />}
              />
            </li>
            <li>
              <DashBoardMenuItem
                menuItemLink="manage-tours"
                menuItemTitle="Manage Tours"
                menuItemIcon={<AddLocationIcon />}
              />
            </li>
            <li>
              <DashBoardMenuItem
                menuItemLink="manage-safari-updates"
                menuItemTitle="Manage Safari Updates"
                menuItemIcon={<AddLocationIcon />}
              />
            </li>
            <li>
              <DashBoardMenuItem
                menuItemLink="manage-bookings"
                menuItemTitle="Manage Bookings"
                menuItemIcon={<BookOutlinedIcon />}
              />
            </li>
            <li>
              <DashBoardMenuItem
                menuItemLink="manage-subscribers"
                menuItemTitle="Manage Subcribers"
                menuItemIcon={<CardMembershipIcon />}
              />
            </li>
            <li>
              <DashBoardMenuItem
                menuItemLink="manage-users"
                menuItemTitle="Manage users"
                menuItemIcon={<GroupAddOutlinedIcon />}
              />
            </li>
          </ul>
        </div>
        <div className={classes.dav__dashboard_selected_menu_item}>
          <div className={classes.dav__dashboard_selected_menu_title}>
            <h3>{menuTitle}</h3>
          </div>

          <div className={classes.dav__dashboard_selected_display_wrapper}>
            <Outlet />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default DashBoard;
