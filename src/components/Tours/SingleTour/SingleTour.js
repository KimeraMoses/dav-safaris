import React, { useEffect } from "react";
import classes from "./SingleTour.module.css";
import { useParams } from "react-router";
import Itinary from "./Itinerary/Itinary";
import JumpNavigation from "./Navigation/JumpNavigation";
import BookingForm from "./Bookings/BookingForm";
import Reviews from "./Reviews/Reviews";
import PriceQuote from "./PriceQuote/PriceQuote";
import RelatedTours from "./RelatedTour/RelatedTours";
import { useDispatch, useSelector } from "react-redux";
import { fetchTourName } from "../../../store/Actions/TourActions";

export const SingleHero = (props) => {
  const { title, image } = props;
  return (
    <div
      className={classes.dav__single_tour_hero}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <h1>{title}</h1>
    </div>
  );
};

const SingleTour = () => {
  const dispatch = useDispatch();
  const { tourTitle } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchTourName(tourTitle));
  }, [tourTitle, dispatch]);
  const Tour = useSelector((state) => state.tour.tourDetails);

  return (
    <div className={classes.dav__single_tour_page_wrapper}>
      <SingleHero title={Tour && Tour.name} image={Tour && Tour.imageCover} />
      <JumpNavigation />

      <div className={classes.dav__single_tour_highlights_wrapper}>
        <div className={classes.dav__tour_highlights} id="description">
          <div className={classes.dav__single_tour_description}>
            {Tour.description}
          </div>
          <h2>Tour highlights</h2>
          <div className={classes.dav__tour_highlights_list}>
            <ul>
              {Tour &&
                Tour.tourActivities &&
                Tour.tourActivities.map((item, index) => {
                  return (
                    <li key={index}>
                      <p>{item}</p>
                    </li>
                  );
                })}
            </ul>
          </div>

          <div className={classes.dav__single_tour_package_wrapper}>
            <PriceQuote
              type="includes"
              Items={
                Tour && Tour.packageDetails && Tour.packageDetails.price_inludes
              }
            />
            <PriceQuote
              type="excludes"
              Items={
                Tour &&
                Tour.packageDetails &&
                Tour.packageDetails.price_excludes
              }
            />
          </div>

          <div className={classes.dav__intinary_details} id="itinerary">
            <div className={classes.dav__itinary_header}>
              <h2>Itinary in details</h2>
            </div>

            <ul className={classes.dav__intinary_list_wrapper}>
              {Tour &&
                Tour.dayActivityDescription &&
                Tour.dayActivityDescription.map((itinary, index) => {
                  return (
                    <Itinary
                      key={index}
                      day={itinary.day}
                      itinTitle={itinary.title}
                      itinDescription={itinary.description}
                      meal_plan={itinary.meal_plan}
                      accomodation={itinary.accomodation}
                    />
                  );
                })}
            </ul>
          </div>
        </div>
        <div className={classes.dav__tour_bookings_section}>
          <BookingForm />
        </div>
      </div>
      <Reviews Tour={Tour} />
      <RelatedTours TourCategory={Tour && Tour.category} />
    </div>
  );
};

export default SingleTour;
