import { Button } from "@material-ui/core";
import React from "react";
import ReviewCard from "../ReviewCard/ReviewCard";
import ReviewCardSkeleton from "../ReviewCard/ReviewCardSkeleton";
import classes from "./ReviewsList.module.css";

const ReviewsList = (props) => {
  const { ReviewTour, reviews, isLoading } = props;

  return (
    <>
      {isLoading ? (
        [...Array(4).keys()].map((index) => {
          return <ReviewCardSkeleton key={index} />;
        })
      ) : reviews && reviews.length > 0 ? (
        reviews.map((review) => {
          return (
            <ReviewCard
              key={review.id}
              userRating={review.rating}
              userReview={review.review}
              UserName={review.user_name}
              ReviewDate={review.createdAt}
              visit_month={review.visit_month}
              visit_year={review.visit_year}
              country_of_residence={review.country_of_residence}
            />
          );
        })
      ) : (
        <div className={classes.dav__no_reviews_message_wrapper}>
          <b>Be the first to review this tour </b>
          <Button onClick={ReviewTour} variant="outlined" color="primary">
            Review Tour
          </Button>
        </div>
      )}
    </>
  );
};

export default ReviewsList;
