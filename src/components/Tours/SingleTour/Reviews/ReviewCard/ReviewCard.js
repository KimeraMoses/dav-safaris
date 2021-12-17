import { Rating } from "@material-ui/lab";
import React from "react";
import classes from "./ReviewCard.module.css";

const ReviewCard = ({userRating, userReview, UserName, ReviewDate}) => {
  return (
    <div className={classes.dav__review_card_wrapper}>
      <div className={classes.dav__user_rating}>
        <p><Rating name="read-only" value={userRating} readOnly /></p>
      </div>
      <div className={classes.dav__user_review}>
          <p>{userReview}</p>
      </div>
      <div className={classes.dav__user_review_meta}>
          <p>Reviewed on {ReviewDate} by <span>{UserName}</span></p>
      </div>
    </div>
  );
};

export default ReviewCard;
