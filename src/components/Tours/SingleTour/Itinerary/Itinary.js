import React, { useState } from "react";
import classes from "./Itinary.module.css";
import LessIcon from "@material-ui/icons/ExpandLess";
import MoreIcon from "@material-ui/icons/ExpandMore";

const Itinary = (props) => {
  const [show, setShow] = useState(false);
  const { day, itinTitle, itinDescription, meal_plan, accomodation } = props;

  // console.log(day,day.length)
  // let NewDay = day;
  // if(day.length>2){
  //   NewDay = day.split('-')
  // }
  // console.log(day, NewDay + NewDay[1].sup())
  return (
    <li className={classes.dav__itinary_day}>
      <div className={classes.itinary_day__icon}>
        <span className={classes.itin_day__icon_text}>Day</span>
        <span className={classes.itin_day__icon_number}>{day}</span>
      </div>
      <div className={classes.dav__itinary_accordion_item}>
        <div
          className={classes.dav__itinary_title_wrapper}
          onClick={() => setShow(!show)}
        >
          <div className={`${classes.dav__itinary_title} ${show? classes.dav__itinary_expanded: ''}`}>{itinTitle}</div>
          <div className={classes.dav__itinary_expand_icon}>
            {show ? <LessIcon /> : <MoreIcon />}
          </div>
        </div>
        <div
          className={`${classes.dav__itinary_content} ${
            show ? classes.dav__itinary_content_show : ""
          }`}
        >
          <div className={classes.dav__itinary_content_inner}>
            <p>{itinDescription}</p>
            <div className={classes.dav__itinary_meta}>
              <p>
                <span className={classes.dav__itinary_meta__item}>
                  Meal Plan:
                </span>{" "}
                {meal_plan}
              </p>
              <p>
                <span className={classes.dav__itinary_meta__item}>
                  Accomodation:
                </span>{" "}
                {accomodation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Itinary;
