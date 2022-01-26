import React from "react";
import { Avatar } from "@material-ui/core";
import { Rating, Skeleton } from "@material-ui/lab";
import classes from "./ReviewCardSkeleton.module.css";

const ReviewCardSkeleton = () => {

  return (
    <div className={classes.dav__review_card_wrapper}>
      <div className={classes.dav__review_user_wrapper}>
          <Avatar>
            <Skeleton variant="circle"></Skeleton>
          </Avatar>
        <div className={classes.dav__user_rating}>
          <span className={classes.dav__review_user_name}>
            <Skeleton animation="wave" width="60%"/>
          </span>
          <p>
            <Rating name="read-only" value={0} readOnly />
          </p>
        </div>
      </div>
      <div className={classes.dav__user_review}>
        <Skeleton width="100%" height="100px" animation="wave"/>
      </div>
      <div className={classes.dav__user_review_meta}>
        <span class={classes.dav__review__person__visit_date}>
          <b>Visited:</b>{" "}
          <Skeleton width="100%" animation="wave"/>
        </span>
        <span class={classes.dav__review__person__reviewed}>
          <b>Reviewed:</b>{" "}
          <Skeleton width="100%" animation="wave" />
        </span>
      </div>
    </div>
  );
};

export default ReviewCardSkeleton;
