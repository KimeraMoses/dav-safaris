import React from "react";
import classes from "./PriceQuote.module.css";

const PriceQuote = (props) => {
  const { type } = props;

  const Pincludes = type === "includes" ? true : false;
  return (
    <div className={classes.dav__tour_points_wrapper}>
      <div className={classes.dav__tour_points_header}>
        <h5>Price {Pincludes ? "Includes" : "Excludes"}:</h5>
      </div>
      <div className={classes.dav__tour_price_includes}>
        <ul
          className={`${classes.dav__tour_price_includes_list} ${Pincludes? '': classes.dav__price_excludes}`}
        >
          <li>
            <span>Scheduled international flights</span>
          </li>
          <li>
            <span>Fully insured vehicle hire</span>
          </li>
          <li>
            <span>All accommodation</span>
          </li>
          <li>24-hour support while you travel</li>
        </ul>
      </div>
    </div>
  );
};

export default PriceQuote;
