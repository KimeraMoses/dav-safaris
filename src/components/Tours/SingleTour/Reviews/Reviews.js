import React from "react";
import { Button, Paper } from "@material-ui/core";
import RatingCount from "./TourRatings/RatingCount";
import classes from "./Reviews.module.css";
import ReviewForm from "./ReviewForm/ReviewForm";
import ReviewsList from "./ReviewsList/ReviewsList";

const Reviews = () => {
  return (
    <div className={classes.dav__tour_reviews}>
      <div id="reviews" className={classes.dav__reviews}></div>
      <Paper className={classes.dav__tour_reviews_wrapper}>
        <div className={classes.dav__tour_reviews_header}>
          <div className={classes.dav__tour_reviews_title}>
            <h4>Customers Feedback</h4>
          </div>

        </div>
        <div className={classes.dav__reviews_inner_wrapper}>
          <div className={classes.dav__review_count_wrapper}>
            <RatingCount />
          </div>
          <div className={classes.dav__reviews_list}>
            <h5>Customer Reviews</h5>
            <ReviewsList />
          </div>
        </div>
      </Paper>
      <div className={classes.dav__rate_tour_wrapper}>
        <ReviewForm />
        <Paper className={classes.dav__inquire_about_tour}>
          <strong>Got questions about this tour? </strong>
          <br />{" "}
          <Button variant="outlined" color="primary">
            {" "}
            Make inquiries
          </Button>
        </Paper>
      </div>
    </div>
  );
};

export default Reviews;
