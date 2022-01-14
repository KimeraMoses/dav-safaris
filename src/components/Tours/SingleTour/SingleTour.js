import React, { useEffect, useState } from "react";
import classes from "./SingleTour.module.css";
import singleImage from "../../../assets/dave-safaris-Home-Uganda.jpg";
import { useParams } from "react-router";
import {
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
} from "@material-ui/core";
import { Form } from "react-bootstrap";
import { TagFacesOutlined } from "@material-ui/icons";

import { Button } from "../../UI/Button/Button";
import Itinary from "./Itinerary/Itinary";
import JumpNavigation from "./Navigation/JumpNavigation";
import BookingForm from "./Bookings/BookingForm";
import Reviews from "./Reviews/Reviews";
import PriceQuote from "./PriceQuote/PriceQuote";
import RelatedTours from "./RelatedTour/RelatedTours";

export const itinaries = [
  {
    id: 0,
    title: "travel to murchison falls national park via ziwa rhino sanctuary",
    description:
      "Pick up by your safari guide from the Hotel in Kampala or Entebbe in the morning after breakfast and and embark on the transfer to Murchison falls National Park through the remote away from Kampala. A long the way we shall have a tour to Ziwa rhino sanctuary for rhino tracking adventure and have lunch at Kabalega Dinners. Then after proceed to the park, visit the top of the fall where you will view the stunning falls passing through the 7 m narrow gorge pours into the Victoria Nile with thunderous force. After head to the lodge, have dinner and an overnight",
    Meal_plan: "Breakfast, Lunch and Dinner",
    Accommodation: "Pakuba Lodge or Equivalent.",
  },
  {
    id: 1,
    title: "Murchison Falls National Park and Game drives & Boat cruises",
    description:
      "Today, enjoy early morning breakfast at the lodge and head out for the 2 hours game drive in Ugandas’ largest park with a wide raange of wildlife species such as leopards, hippos, lions, warthogs, cape buffaloes, African elephants, antelopes, Rothschild’s giraffes, waterbucks and various bird species. After the game drive, transfer back to the lodge for lunch and some relaxation, then have a 3 hours launch cruise on the River Nile where you will spot a number of wildlife species along the banks such as African elephants, hippos, Nile crocodile, antelopes, monkeys and water bird species, ride towards the bottom of the falls where you will hike to the top of the fall for about 1hour and 30 minutes after which you will retire to your lodge for dinner and Overnight stay.",
    Meal_plan: "Breakfast, Lunch and Dinner",
    Accommodation: "Pakuba Lodge",
  },
  {
    id: 2,
    title: "Transfer to Kibale Forest via Fort Portal City.",
    description:
      "Wake up early in the morning and have breakfast, then checkout from the lodge and have a game drive through the park to Kibale Forest National park via Fort portal. The Park is one of Africa’s most beautiful rain forests and habitat to 13 primates and the most common ones are Chimpanzees, it also give a great birding experience place with over 325 bird species. Along the way you be spotting stunning landscapes, forests and the remote of the country side. Upon arrival at the park have a nature walk in the evening before continuing to the lodge for dinner and overnight.",
    Meal_plan: "Breakfast, Lunch and Dinner",
    Accommodation: "Kibale Forest Camp or Equivalent",
  },
  {
    id: 3,
    title: "Transfer to Kibale Forest via Fort Portal City.",
    description:
      "Wake up early in the morning and have breakfast, then checkout from the lodge and have a game drive through the park to Kibale Forest National park via Fort portal. The Park is one of Africa’s most beautiful rain forests and habitat to 13 primates and the most common ones are Chimpanzees, it also give a great birding experience place with over 325 bird species. Along the way you be spotting stunning landscapes, forests and the remote of the country side. Upon arrival at the park have a nature walk in the evening before continuing to the lodge for dinner and overnight.",
    Meal_plan: "Breakfast, Lunch and Dinner",
    Accommodation: "Kibale Forest Camp or Equivalent",
  },
  {
    id: 4,
    title: "Transfer to Kibale Forest via Fort Portal City.",
    description:
      "Wake up early in the morning and have breakfast, then checkout from the lodge and have a game drive through the park to Kibale Forest National park via Fort portal. The Park is one of Africa’s most beautiful rain forests and habitat to 13 primates and the most common ones are Chimpanzees, it also give a great birding experience place with over 325 bird species. Along the way you be spotting stunning landscapes, forests and the remote of the country side. Upon arrival at the park have a nature walk in the evening before continuing to the lodge for dinner and overnight.",
    Meal_plan: "Breakfast, Lunch and Dinner",
    Accommodation: "Kibale Forest Camp or Equivalent",
  },
  {
    id: 5,
    title: "Transfer to Kibale Forest via Fort Portal City.",
    description:
      "Wake up early in the morning and have breakfast, then checkout from the lodge and have a game drive through the park to Kibale Forest National park via Fort portal. The Park is one of Africa’s most beautiful rain forests and habitat to 13 primates and the most common ones are Chimpanzees, it also give a great birding experience place with over 325 bird species. Along the way you be spotting stunning landscapes, forests and the remote of the country side. Upon arrival at the park have a nature walk in the evening before continuing to the lodge for dinner and overnight.",
    Meal_plan: "Breakfast, Lunch and Dinner",
    Accommodation: "Kibale Forest Camp or Equivalent",
  },
  {
    id: 6,
    title: "Transfer to Kibale Forest via Fort Portal City.",
    description:
      "Wake up early in the morning and have breakfast, then checkout from the lodge and have a game drive through the park to Kibale Forest National park via Fort portal. The Park is one of Africa’s most beautiful rain forests and habitat to 13 primates and the most common ones are Chimpanzees, it also give a great birding experience place with over 325 bird species. Along the way you be spotting stunning landscapes, forests and the remote of the country side. Upon arrival at the park have a nature walk in the evening before continuing to the lodge for dinner and overnight.",
    Meal_plan: "Breakfast, Lunch and Dinner",
    Accommodation: "Kibale Forest Camp or Equivalent",
  },
  {
    id: 7,
    title: "Transfer to Kibale Forest via Fort Portal City.",
    description:
      "Wake up early in the morning and have breakfast, then checkout from the lodge and have a game drive through the park to Kibale Forest National park via Fort portal. The Park is one of Africa’s most beautiful rain forests and habitat to 13 primates and the most common ones are Chimpanzees, it also give a great birding experience place with over 325 bird species. Along the way you be spotting stunning landscapes, forests and the remote of the country side. Upon arrival at the park have a nature walk in the evening before continuing to the lodge for dinner and overnight.",
    Meal_plan: "Breakfast, Lunch and Dinner",
    Accommodation: "Kibale Forest Camp or Equivalent",
  },
];

const SingleTour = () => {
  const { tourTitle } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tourTitle]);
  const [show, setShow] = useState(false);

  return (
    <div className={classes.dav__single_tour_page_wrapper}>
      <div
        className={classes.dav__single_tour_hero}
        style={{
          backgroundImage: `url(${singleImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <h1>{tourTitle.replaceAll("-", " ")}</h1>
      </div>
      <JumpNavigation />

      <div className={classes.dav__single_tour_highlights_wrapper}>
        <div className={classes.dav__tour_highlights} id="description">
          <h2>Tour highlights</h2>
          <div className={classes.dav__tour_highlights_list}>
            <ul>
              <li>
                <p>Birding Mabamba Wetland</p>
              </li>
              <li>
                <p>
                  Birding the Northern Bank of Murchison Falls National Park
                </p>
              </li>
              <li>
                <p>
                  Chimpanzee and Primates Trekking in Kibale Forest National
                  Park.
                </p>
              </li>
              <li>
                <p>
                  Birding Buhoma Nkuringo Trail In Bwindi Impenetrable National
                  Park
                </p>
              </li>
              <li>
                <p>
                  Birding Buniga Nobe Forest in Bwindi Impenetrable National
                  Park
                </p>
              </li>
              <li>
                <p>
                  Mountain Gorilla Trekking in Bwindi Impenetrable National Park
                </p>
              </li>
              <li>
                <p>Equator Line Expedition in Uganda</p>
              </li>
              <li>
                <p>Birding in Lake Mburo National Park</p>
              </li>
              <li>
                <p>Birding Kihigami Wetland Trail in Semiliki National Park</p>
              </li>
            </ul>
          </div>

          <div className={classes.dav__single_tour_package_wrapper}>
            <PriceQuote type="includes" />
            <PriceQuote type="excludes" />
          </div>

          <div className={classes.dav__intinary_details} id="itinerary">
            <div className={classes.dav__itinary_header}>
              <h2>Itinary in details</h2>
            </div>

            <ul className={classes.dav__intinary_list_wrapper}>
              {itinaries.map((itinary, index) => {
                return (
                  <Itinary
                    key={itinary.id}
                    day={index + 1}
                    itinTitle={itinary.title}
                    itinDescription={itinary.description}
                    meal_plan={itinary.Meal_plan}
                    accomodation={itinary.Accommodation}
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
      <Reviews />
      <RelatedTours />
    </div>
  );
};

export default SingleTour;
