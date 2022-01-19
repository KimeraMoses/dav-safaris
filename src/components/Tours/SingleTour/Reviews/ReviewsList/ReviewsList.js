import React from "react";
import ReviewCard from "../ReviewCard/ReviewCard";

const ReviewsList = () => {
  return (
    <>
      <ReviewCard
        userRating={2}
        userReview="We really enjoyed our safari in Uganda, it was fun to trek the gorillas for the first time, all hotels were incredible and our guide made sure that we don't miss anything about Uganda.
        I recommend Dav Safaris"
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
