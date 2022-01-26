import { Rating } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./RatingCount.module.css";

const RatingCount = (props) => {
  const { isLoading, Reviews } = useSelector((state) => state.reviews);
  const [average, setAverage] = useState(0);
  const ratingsAverage = Reviews && Reviews.tour && Reviews.tour.ratingsAverage;
  const ratingsQuantity =
    Reviews && Reviews.tour && Reviews.tour.ratingsQuantity;
  useEffect(() => {
    setAverage(ratingsAverage);
  }, [ratingsAverage]);

  return (
    <>
      <h5 className={classes.dav__ratings_title}>Customer Ratings</h5>

      <div className={classes.dav__rating_count_wrapper}>
        <div className={classes.dav__rating_overall}>
          Average Ratings <span>{average}</span>{" "}
        </div>
        <Rating
          name="read-only"
          value={average}
          precision={0.5}
          readOnly
        />
        <div className={classes.dav__rating_number}>
          {ratingsQuantity} rating{ratingsAverage !==1? 's': ''}
        </div>
      </div>
    </>
  );
};

export default RatingCount;
