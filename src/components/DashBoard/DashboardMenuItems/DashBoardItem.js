import { Avatar, Link } from "@material-ui/core";
import React from "react";
import classes from "./DashBoardItem.module.css";

const DashBoardItem = () => {
  return (
    <div className={classes.dav__dashboard_menu_item_wrapper}>
      <Avatar variant="circle" className={classes.dav__user_avater}>
        KM
      </Avatar>
      Welcome to your DashBoard
      <p>
        Here you can manage tours, approve bookings, manage users among others
      </p>
      Not Kimera Moses? <Link to="/">Logout</Link>
    </div>
  );
};

export default DashBoardItem;
