import { Avatar, Tooltip } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import { useSelector } from "react-redux";
import classes from "./ReviewCard.module.css";

const ReviewCard = ({
  userRating,
  userReview,
  UserName,
  ReviewDate,
  visit_month,
  visit_year,
  country_of_residence,
}) => {
  const Countries = useSelector((state) => state.countries.countryList);
  const userCountry =
    Countries &&
    Countries.filter((country) => country.name === country_of_residence)[0];
  const countryLogo = userCountry && userCountry.flags && userCountry.flags.png;
  const RDate = new Date(ReviewDate);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const ReviewedDate = RDate.toLocaleDateString("en-US", options);

  return (
    <div className={classes.dav__review_card_wrapper}>
      <div className={classes.dav__review_user_wrapper}>
        <Tooltip title={userCountry && userCountry.name} placement="top" arrow>
          <Avatar src={countryLogo} />
        </Tooltip>
        <div className={classes.dav__user_rating}>
          <span className={classes.dav__review_user_name}>{UserName}</span>
          <p>
            <Rating
              name="read-only"
              value={userRating}
              readOnly
              precision={0.5}
            />
          </p>
        </div>
      </div>
      <div className={classes.dav__user_review}>
        <p>{userReview}</p>
      </div>
      <div className={classes.dav__user_review_meta}>
        <span class={classes.dav__review__person__visit_date}>
          <b>Visited:</b> {visit_month}, {visit_year}
        </span>
        <span class={classes.dav__review__person__reviewed}>
          <b>Reviewed:</b> {ReviewedDate}
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
