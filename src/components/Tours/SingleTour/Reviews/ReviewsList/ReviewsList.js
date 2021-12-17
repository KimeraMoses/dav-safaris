import React from "react";
import ReviewCard from "../ReviewCard/ReviewCard";

const ReviewsList = () => {
  return (
    <>
      <ReviewCard
        userRating={2}
        userReview="This was an awesome experience, i loved it all"
        UserName="kimera Moses"
        ReviewDate={`12-10-2020`}
      />
      <ReviewCard
        userRating={3}
        userReview="This was an awesome experience, i loved it all"
        UserName="Ssemugenyi Isaac"
        ReviewDate={`10-11-2021`}
      />
      <ReviewCard
        userRating={5}
        userReview="lovely tour enjoyed each and every moment"
        UserName="mubiru isaac"
        ReviewDate={`02-08-2019`}
      />
    </>
  );
};

export default ReviewsList;
