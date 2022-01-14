import React, { useState } from "react";

//===MUI IMPORTS===
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { Paper } from "@material-ui/core";

//===REDUX IMPORTS===
import { useDispatch,useSelector } from "react-redux";

//===COMPONENT IMPORTS===
import classes from "./Dropdown.module.css";
import { itinaries } from "../../Tours/SingleTour/SingleTour";

const Dropdown = (props) => {
  const { selected, setSelected, setSelectedCode, fetchItems } = props;
  const userToken = useSelector((state) => state.auth.token);
  const DarkMode = false;
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  const selectedItemHandler = (name, uni_code) => {
    setSelected(name);
    setIsActive(false);
    setSelectedCode(uni_code)
    dispatch(fetchItems(userToken))
  };

  return (
    <div className={classes.gpa__dropdown}>
      <div
        className={`${classes.gpa__dropdown_button} ${
          DarkMode ? classes.gpa__dark_mode : ""
        }`}
        onClick={(e) => setIsActive(!isActive)}
      >
        <div className={classes.gpa__dropdown_button_text}>
          {selected && selected.replaceAll("-", " ")}
        </div>
        <div>{isActive ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</div>
      </div>
      {isActive && (
        <Paper
          className={`${classes.gpa__dropdown_content} ${
            DarkMode ? classes.gpa__dark_mode : ""
          }`}
        >
          {itinaries.map((option) => {
            return (
              <div
                key={option.id}
                className={`${classes.gpa__dropdown_item} ${
                  DarkMode ? classes.gpa__dark_mode : ""
                }`}
                onClick={(e) => selectedItemHandler(option.title, option.id)}
              >
                {option.title.replaceAll("-", " ")}
              </div>
            );
          })}
        </Paper>
      )}
    </div>
  );
};

export default Dropdown;
