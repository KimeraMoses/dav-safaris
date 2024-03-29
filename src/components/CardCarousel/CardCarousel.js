import React from "react";

//===REDUX IMPORT

//===REACT ELASTIC CAROUSEL IMPORTS
import Carousel from "react-elastic-carousel";

//===COMPONENTS IMPORTS
import styles from "./CourseUnitCarousel.module.css";
import TourCard from "../Tours/TourCard";
import TourCardSkeleton from "../Tours/TourCardSkeleton";

const breakpoints = [
  { width: 1, itemsToShow: 1.2 },
  { width: 500, itemsToShow: 2.2 },
  { width: 780, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4.2 },
];

const CardCarousel = ({ tours, isLoading }) => {
  return (
    <Carousel
      className={`${styles.gpa__tours_carousel_wrapper}`}
      breakPoints={breakpoints}
      pagination={false}
      easing="ease"
      tiltEasing="ease"
    >
      {isLoading
        ? [...Array(8).keys()].map((index) => {
            return <TourCardSkeleton type="slider" key={index} />;
          })
        : tours?.slice(0, 20).map((tour) => {
            return <TourCard key={tour.id} tour={tour} />;
          })}
    </Carousel>
  );
};
export default CardCarousel;
