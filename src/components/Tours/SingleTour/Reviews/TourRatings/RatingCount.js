import { Rating } from "@material-ui/lab";
import React, { useEffect } from "react";
import classes from "./RatingCount.module.css";

const RatingCount = (props) => {
  const {ratingsAverage,ratingsQuantity} = props
  useEffect(()=>{},[ratingsAverage])
  return (
    <>
      <h5 className={classes.dav__ratings_title}>Customer Ratings</h5>

      <div className={classes.dav__rating_count_wrapper}>
        <div className={classes.dav__rating_overall}>Average Ratings <span>{ratingsAverage}</span> </div>
        <Rating name="read-only" value={ratingsAverage} precision={0.5}  readOnly />
        <div className={classes.dav__rating_number}>{ratingsQuantity} ratings</div>
      </div>
    </>
  );
};

export default RatingCount;
