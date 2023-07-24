import React, { useEffect } from "react";
import classes from "./SingleTour.module.css";
import { useParams } from "react-router";
import Itinary from "./Itinerary/Itinary";
import JumpNavigation from "./Navigation/JumpNavigation";
import BookingForm from "./Bookings/BookingForm";
import Reviews from "./Reviews/Reviews";
import PriceQuote from "./PriceQuote/PriceQuote";
import RelatedTours from "./RelatedTour/RelatedTours";
import SEO from "../../../containers/SEO/SEO";
import "./SingleTour.scss";
import { useTour } from "../../../hooks";

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
  const { tourTitle } = useParams();
  const { tour } = useTour(tourTitle);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tourTitle]);

  let title = isEmptyObject(tour)
    ? defaultMeta.title
    : `${tour?.name} - Dav Safaris`;

  let description = isEmptyObject(tour)
    ? defaultMeta.description
    : tour?.description?.substr(0, 268);

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
        keywords={tour && tour.key_words?.join()}
        image={tour && tour.imageCover}
      />
      <div className={classes.dav__single_tour_page_wrapper}>
        <SingleHero title={tour && tour.name} image={tour && tour.imageCover} />
        <JumpNavigation />

        <div className={classes.dav__single_tour_highlights_wrapper}>
          <div className={classes.dav__tour_highlights} id="description">
            <div
              className="dav__single_tour_description"
              dangerouslySetInnerHTML={{ __html: tour.description }}
            ></div>
            {tour?.tourActivities?.length ? (
              <>
                <h2>Tour highlights</h2>
                <div className={classes.dav__tour_highlights_list}>
                  <ul>
                    {tour &&
                      tour.tourActivities &&
                      tour.tourActivities
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
              </>
            ) : null}

            {tour?.packageDetails?.price_excludes.length &&
            tour?.packageDetails?.price_inludes.length ? (
              <div className={classes.dav__single_tour_package_wrapper}>
                <PriceQuote
                  type="includes"
                  Items={
                    tour &&
                    tour.packageDetails &&
                    tour.packageDetails.price_inludes
                  }
                />
                <PriceQuote
                  type="excludes"
                  Items={
                    tour &&
                    tour.packageDetails &&
                    tour.packageDetails.price_excludes
                  }
                />
              </div>
            ) : null}
            {tour?.dayActivityDescription?.length ? (
              <div className={classes.dav__intinary_details} id="itinerary">
                <div className={classes.dav__itinary_header}>
                  <h2>Itinary in details</h2>
                </div>

                <ul className={classes.dav__intinary_list_wrapper}>
                  {tour &&
                    tour.dayActivityDescription &&
                    tour.dayActivityDescription.map((itinary, index) => {
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
          </div>
          <div className={classes.dav__tour_bookings_section}>
            <BookingForm tour={tour} />
          </div>
        </div>
        <Reviews Tour={tour} />
        <RelatedTours TourCategory={tour && tour.category} />
      </div>
    </>
  );
};

export default SingleTour;
