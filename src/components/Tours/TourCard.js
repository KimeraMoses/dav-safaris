import React from "react";
import classes from "./TourCard.module.css";
import { Link } from "react-router-dom";
import { Timer } from "@material-ui/icons";
import { Rating } from "@material-ui/lab";
import { useSelector } from "react-redux";
import { DAV_ROLES } from "../../constants";

const TourCard = ({ tour }) => {
  const {
    imageCover,
    name,
    slug,
    duration,
    description,
    ratingsAverage,
    price,
  } = tour;

  const user = useSelector((state) => state.auth.user);

  const isAgent = user?.role === DAV_ROLES.AGENT;

  return (
    <div className={classes.tour_card_wrapper}>
      <div className={classes.tour_card_header}>
        <Link to={`/tours/${slug}`}>
          <img src={imageCover} alt="Tour" />
          {isAgent && <span className={classes.tour__discount}>${price}</span>}
        </Link>
      </div>
      <div className={classes.tour_card_body}>
        <div className={classes.tour_title}>
          <h4 title={`View ${name}`}>
            <Link to={`/tours/${slug}`}>{name} </Link>
          </h4>
        </div>
        <span className={classes.tour__date}>
          <Timer /> {duration} DAYS - {duration - 1} NIGHTS
        </span>
        <div className={classes.tour__description}>
          <div
            className="dav__single_tour_description"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
      </div>
      <div className={classes.tour__footer}>
        <div className={classes.tour_ratings}>
          <Rating
            name="read-only"
            readOnly
            precision={0.5}
            value={ratingsAverage}
          />
        </div>
        <div className={classes.tour__read_more}>
          <Link to={`/tours/${slug}`}>
            <span>{isAgent ? "View Tour" : "Book Tour"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
