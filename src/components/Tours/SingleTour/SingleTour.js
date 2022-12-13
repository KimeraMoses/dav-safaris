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
import SEO from "../../../containers/SEO/SEO";
import "./SingleTour.scss";

export const isEmptyObject = (obj) => {
  return JSON.stringify(obj) === "{}";
};

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

const defaultMeta = {
  title:
    "Best african Gorilla Safaris, Birding, Cultural Safaris and Mountain Climbing",
  description:
    "Africa Safari | Wildlife Safaris | Gorilla Trekking | Chimpanzee Trekking| Gorilla Trekking Uganda | Tanzania Safari | Kenya Safaris | Gorilla trekking Rwanda |African Wildlife Safari park | African Safari tours | trip advisor",
};

const SingleTour = () => {
  const dispatch = useDispatch();
  const { tourTitle } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchTourName(tourTitle));
  }, [tourTitle, dispatch]);
  const Tour = useSelector((state) => state.tour.tourDetails);

  let title = isEmptyObject(Tour)
    ? defaultMeta.title
    : `${Tour?.name} - Dav Safaris`;

  let description = isEmptyObject(Tour)
    ? defaultMeta.description
    : Tour?.description?.substr(0, 268);

  if (tourTitle === "7-day-luxury-kenya-safari-holiday") {
    title = "7-Day Luxury Kenya Safari Holiday, Kenya Safari Luxury";
    description =
      "Our 7-Day Luxury Kenya Safari Holiday offers a chance to experience one of the world's most beautiful and varied wildlife destinations in style and comfort. ";
  } else if (tourTitle === "6-days-kenya-safari-adventure") {
    title = "6 Days Kenya Safari Adventure, Safari in Kenya Masai Mara";
    description =
      "6 Days Kenya Safari adventure allows you to encounter the best wildlife experience in Africa. Plan your trip with us and enjoy Safari in Kenya Masai Mara.";
  } else if (tourTitle === "10-days-wildlife-kenya-and-tanzania-safari") {
    title = "10 Days Wildlife Safari in Kenya and Tanzania  - Dav Safaris";
    description =
      "Looking for 10 Day wildlife Kenya and Tanzania safari combo tour, Visit us and enjoy our 10 Days Wildlife safaris in Kenya and Tanzania on one trip.";
  } else if (
    tourTitle === "3-days-gorilla-trekking-in-mgahinga-gorilla-national-park."
  ) {
    title = "3 Days Gorilla Trekking in Mgahinga Gorilla National Park Uganda";
    description =
      "Mgahinga Gorilla National Park is the biggest reason to visit Uganda. So what are you thinking? Choose 3 Days Gorilla Trekking in Mgahinga Gorilla National Park Uganda and enjoy your trip.";
  }

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={Tour && Tour.key_words?.join()}
        image={Tour && Tour.imageCover}
      />
      <div className={classes.dav__single_tour_page_wrapper}>
        <SingleHero title={Tour && Tour.name} image={Tour && Tour.imageCover} />
        <JumpNavigation />

        <div className={classes.dav__single_tour_highlights_wrapper}>
          <div className={classes.dav__tour_highlights} id="description">
            <div
              className="dav__single_tour_description"
              dangerouslySetInnerHTML={{ __html: Tour.description }}
            >
              {/* {Tour.description} */}
            </div>
            <h2>Tour highlights</h2>
            <div className={classes.dav__tour_highlights_list}>
              <ul>
                {Tour &&
                  Tour.tourActivities &&
                  Tour.tourActivities
                    .filter((item) => item.length > 0)
                    .map((item, index) => {
                      return (
                        <li key={index}>
                          <p>{item}</p>
                        </li>
                      );
                    })}
              </ul>
            </div>

            {Tour?.packageDetails?.price_excludes.length &&
            Tour?.packageDetails?.price_inludes.length ? (
              <div className={classes.dav__single_tour_package_wrapper}>
                <PriceQuote
                  type="includes"
                  Items={
                    Tour &&
                    Tour.packageDetails &&
                    Tour.packageDetails.price_inludes
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
            ) : null}
            {Tour?.dayActivityDescription?.length ? (
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
            ) : null}
            {/* <div className={classes.dav__payment_btn_wrapper}> */}
            {/* <Paper className={classes.dav__payment_btn_wrapper}>
              <a
                href="https://payments.pesapal.com/davsafaris"
                className={classes.dav__payment_btn}
                target="_blank"
                rel="noreferrer"
              >
                Pay for Tour
              </a>
            </Paper> */}
            {/* </div> */}
          </div>
          <div className={classes.dav__tour_bookings_section}>
            <BookingForm />
          </div>
        </div>
        <Reviews Tour={Tour} />
        <RelatedTours TourCategory={Tour && Tour.category} />
      </div>
    </>
  );
};

export default SingleTour;
