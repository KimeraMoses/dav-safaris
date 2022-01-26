import { Button, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ReviewCard from "../ReviewCard/ReviewCard";
import ReviewCardSkeleton from "../ReviewCard/ReviewCardSkeleton";
import classes from "./ReviewsList.module.css";

const ReviewsList = (props) => {
  const { isLoading, Reviews } = useSelector((state) => state.reviews);
  useEffect(() => {}, [Reviews]);
  const { ReviewTour} = props
  const ReviewsList = Reviews && Reviews.reviews;
  // const ratingAverage = ReviewsObj && ReviewsObj.tour.ratingsAverage
  // const ratingsQuantity = ReviewsObj && ReviewsObj.tour.ratingsQuantity
  return (
    <>
      {isLoading
        ? [...Array(4).keys()].map((index) => {
            return <ReviewCardSkeleton />;
          })
        : ReviewsList && ReviewsList.length>0 ?
          ReviewsList.map((review) => {
            return (
              <ReviewCard
                userRating={review.rating}
                userReview={review.review}
                UserName={review.user_name}
                ReviewDate={review.createdAt}
                visit_month={review.visit_month}
                visit_year={review.visit_year}
                country_of_residence={review.country_of_residence}
              />
            );
          }):
          <div className={classes.dav__no_reviews_message_wrapper}>
            <b>Be the first to review this tour </b>
            <Button onClick={ReviewTour} variant="outlined" color="primary">Review Tour</Button>
          </div>
          }
    </>
  );
};

export default ReviewsList;
