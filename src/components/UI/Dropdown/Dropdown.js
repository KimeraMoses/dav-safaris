import React, { useState } from "react";

//===MUI IMPORTS===
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { Paper } from "@material-ui/core";

//===REDUX IMPORTS===

//===COMPONENT IMPORTS===
import classes from "./Dropdown.module.css";
const Countries =["Uganda", "Kenya","Tanzania","Rwanda"]

const Dropdown = (props) => {
  const { selected, setSelected } = props;
  const [isActive, setIsActive] = useState(false);
  const selectedItemHandler = (name) => {
    setSelected(name);
    setIsActive(false);
  };

  return (
    <div className={classes.gpa__dropdown}>
      <div
        className={classes.gpa__dropdown_button}
        onClick={(e) => setIsActive(!isActive)}
      >
        <div className={classes.gpa__dropdown_button_text}>
          {selected}
        </div>
        <div>{isActive ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</div>
      </div>
      {isActive && (
        <Paper
          className={classes.gpa__dropdown_content}
        >
          {Countries.map((country, index) => {
            return (
              <div
                key={index}
                className={classes.gpa__dropdown_item}
                onClick={(e) => selectedItemHandler(country.toLowerCase())}
              >
                {country}
              </div>
            );
          })}
        </Paper>
      )}
    </div>
  );
};

export default Dropdown;
