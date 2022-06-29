import React from "react";
import classes from "./Feature.module.css";
import NotificationsIcon from "@material-ui/icons/NotificationsActive";

const Feature = (props) => {
  return (
    <div className={classes.gpa__feature_comming}>
      <div className={classes.gpa__feature_icon}>
        <NotificationsIcon />
      </div>
      <h4>{props.Title}</h4>
      <div className={classes.gpa__feature_comming_msg}>
        <p>The functionality of this feature is coming soon!</p>
      </div>
    </div>
  );
};

export default Feature;
