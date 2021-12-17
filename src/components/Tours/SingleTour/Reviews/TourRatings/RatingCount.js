import { Rating } from "@material-ui/lab";
import React from "react";
import classes from "./RatingCount.module.css";

const RatingCount = () => {
  return (
    <>
      <h5 className={classes.dav__ratings_title}>Customer Ratings</h5>

      <div className={classes.dav__rating_count_wrapper}>
        <div className={classes.dav__rating_overall}>4/5</div>
        <Rating name="read-only" value={4} readOnly />
        <div className={classes.dav__rating_number}>342 ratings</div>
      </div>
    </>
  );
};

export default RatingCount;
