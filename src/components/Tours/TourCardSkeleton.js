import React from "react";
import classes from "./TourCard.module.css";
import tourImg from "../../assets/background.webp";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Timer, Watch } from "@material-ui/icons";
import { Rating, Skeleton } from "@material-ui/lab";
import { Avatar } from "@material-ui/core";

const TourCardSkeleton = (props) => {
  const {
    TourImage,
    TourTitle,
    NumDays,
    NumNights,
    TourDescription,
    TourRating,
    TourSlug,
    type,
    key
  } = props;

  return (
    <div className={classes.tour_card_wrapper} key={key}>
      <Skeleton width={`${type==="slider"? "300px": "100%"}`} height={220}>
        <Avatar>
          <div className={classes.tour_card_header}>
            <img src={TourImage} alt="Tour" />
            <span className={classes.tour__discount}>20% off</span>
          </div>
        </Avatar>
      </Skeleton>
      <div className={classes.tour_card_body}>
        <div className={classes.tour_title}>
          <h4 title={`View ${TourTitle}`}>
            <Skeleton width="100%" height={20}>
              <Link to={`/tours/${TourSlug}`}>{TourTitle} </Link>
            </Skeleton>
          </h4>
        </div>
        <span className={classes.tour__date}>
          <Skeleton width="60%" height={20}></Skeleton>
        </span>
        <div className={classes.tour__description}>
          <Skeleton width="100%" height={60}>
            <p>{TourDescription} </p>
          </Skeleton>
        </div>
      </div>
      <div className={classes.tour__footer}>
        <div className={classes.tour_ratings}>
          <Rating
            name="read-only"
            readOnly
            precision={0.5}
            value={TourRating}
          />
        </div>
        <div className={`${classes.tour__read_more} ${classes.btn__disabled}`}>
          <Link to={`/`}>Loading...</Link>
        </div>
      </div>
    </div>
  );
};

export default TourCardSkeleton;
