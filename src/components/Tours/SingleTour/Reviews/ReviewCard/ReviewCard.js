import { Avatar, Tooltip } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import classes from "./ReviewCard.module.css";

const ReviewCard = ({ userRating, userReview, UserName, ReviewDate }) => {
  return (
    <div className={classes.dav__review_card_wrapper}>
      <div className={classes.dav__review_user_wrapper}>
        <Tooltip  title="Uganda" placement="top" arrow>
          <Avatar src="https://flagcdn.com/w320/tv.png" />
        </Tooltip>
        <div className={classes.dav__user_rating}>
          <span className={classes.dav__review_user_name}>{UserName}</span>
          <p>
            <Rating name="read-only" value={userRating} readOnly />
          </p>
        </div>
      </div>
      <div className={classes.dav__user_review}>
        <p>{userReview}</p>
      </div>
      <div className={classes.dav__user_review_meta}>
        <span class={classes.dav__review__person__visit_date}>
          <b>Visited:</b> December 2021
        </span>
        <span class={classes.dav__review__person__reviewed}>
          <b>Reviewed:</b> Jan 1, 2022
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
