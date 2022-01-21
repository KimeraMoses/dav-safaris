import React from "react";
import classes from "./TourCard.module.css";
import tourImg from "../../assets/background.webp";
import { Link } from "react-router-dom";
import { Timer, Watch } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";

const TourCard = (props) => {
  const { TourImage, TourTitle, NumDays, NumNights, TourDescription,TourRating,TourSlug } = props;
  return (
    <div className={classes.tour_card_wrapper}>
      <div className={classes.tour_card_header}>
        <Link to={`/tours/${TourSlug}`}>
          <img src={TourImage} alt="Tour" />
          <span className={classes.tour__discount}>20% off</span>
        </Link>
      </div>
      <div className={classes.tour_card_body}>
        <div className={classes.tour_title}>
          <h4 title={`View ${TourTitle}`}>
            <Link to={`/tours/${TourSlug}`}>
              {TourTitle}{" "}
            </Link>
          </h4>
        </div>
        <span className={classes.tour__date}>
          <Timer /> {NumDays} DAYS - {NumNights} NIGHTS
        </span>
        <div className={classes.tour__description}>
          <p>{TourDescription} </p>
        </div>
      </div>
      <div className={classes.tour__footer}>
        <div className={classes.tour_ratings}>
          <Rating name="read-only" value={TourRating} readOnly precision={0.5}/>
        </div>
        <div className={classes.tour__read_more}>
          <a href="#">Book Tour</a>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
