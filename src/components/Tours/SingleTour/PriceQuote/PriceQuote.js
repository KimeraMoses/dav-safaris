import React from "react";
import { useSelector } from "react-redux";
import classes from "./PriceQuote.module.css";

const PriceQuote = (props) => {
  const { type, Items } = props;

  const Pincludes = type === "includes" ? true : false;
  return (
    <div className={classes.dav__tour_points_wrapper}>
      <div className={classes.dav__tour_points_header}>
        <h5>Price {Pincludes ? "Includes" : "Excludes"}:</h5>
      </div>
      <div className={classes.dav__tour_price_includes}>
        <ul
          className={`${classes.dav__tour_price_includes_list} ${
            Pincludes ? "" : classes.dav__price_excludes
          }`}
        >
          {Items &&
            Items.map((item, index) => {
              return (
                <li key={index}>
                  <span>{item}</span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default PriceQuote;
