import React from "react";
import PopularTours from "../../../HomePage/PopularTours/PopularTours";
import SectionTitle from "../../../HomePage/SectionTitle/SectionTitle";
import classes from "./RelatedTours.module.css";
import { useAllTours } from "../../../../hooks";

const RelatedTours = ({ TourCategory }) => {
  const { tours, isLoading } = useAllTours();

  const RTours = tours.filter((tour) => tour.category === TourCategory);

  return (
    <div className={classes.dav__related_tours_wrapper}>
      <SectionTitle Title="Related Tours" />
      <PopularTours tours={RTours} isLoading={isLoading} />
    </div>
  );
};

export default RelatedTours;
