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
import JumpNavigation from "./JumpNavigation";
import BookingForm from "./BookingForm";

const itinaries = [
  {
    id: 0,
    title: "travel to murchison falls national park via ziwa rhino sanctuary",
    description: "Pick up by your safari guide from the Hotel in Kampala or Entebbe in the morning after breakfast and and embark on the transfer to Murchison falls National Park through the remote away from Kampala. A long the way we shall have a tour to Ziwa rhino sanctuary for rhino tracking adventure and have lunch at Kabalega Dinners. Then after proceed to the park, visit the top of the fall where you will view the stunning falls passing through the 7 m narrow gorge pours into the Victoria Nile with thunderous force. After head to the lodge, have dinner and an overnight",
    Meal_plan: "Breakfast, Lunch and Dinner",
    Accommodation: "Pakuba Lodge or Equivalent.",
  },
  {
    id: 1,
    title: "Murchison Falls National Park and Game drives & Boat cruises",
    description: "Today, enjoy early morning breakfast at the lodge and head out for the 2 hours game drive in Ugandas’ largest park with a wide raange of wildlife species such as leopards, hippos, lions, warthogs, cape buffaloes, African elephants, antelopes, Rothschild’s giraffes, waterbucks and various bird species. After the game drive, transfer back to the lodge for lunch and some relaxation, then have a 3 hours launch cruise on the River Nile where you will spot a number of wildlife species along the banks such as African elephants, hippos, Nile crocodile, antelopes, monkeys and water bird species, ride towards the bottom of the falls where you will hike to the top of the fall for about 1hour and 30 minutes after which you will retire to your lodge for dinner and Overnight stay.",
    Meal_plan: "Breakfast, Lunch and Dinner",
    Accommodation: "Pakuba Lodge"
  },
  {
    id: 2,
    title: "Transfer to Kibale Forest via Fort Portal City.",
    description: "Wake up early in the morning and have breakfast, then checkout from the lodge and have a game drive through the park to Kibale Forest National park via Fort portal. The Park is one of Africa’s most beautiful rain forests and habitat to 13 primates and the most common ones are Chimpanzees, it also give a great birding experience place with over 325 bird species. Along the way you be spotting stunning landscapes, forests and the remote of the country side. Upon arrival at the park have a nature walk in the evening before continuing to the lodge for dinner and overnight.",
    Meal_plan: "Breakfast, Lunch and Dinner",
    Accommodation: "Kibale Forest Camp or Equivalent",
  },
];

const SingleTour = () => {
  const { tourTitle } = useParams();
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);
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
      <JumpNavigation/>
    
      <div className={classes.dav__single_tour_highlights_wrapper} >
        <div className={classes.dav__tour_highlights} id="description">
          <h2>Tour highlights</h2>
          <div className={classes.dav__tour_highlights_list}>
            <ul>
              <li>
                <p>
                  Explore the rich fossil fields at Cypress Hills
                  Interprovincial Park, a UNESCO World Heritage Site.
                </p>
              </li>
              <li>
                <p>
                  See plains bison and Canada's prairie landscapes in Grasslands
                  National Park.
                </p>
              </li>
              <li>
                <p>
                  See where the 'Mounties' are trained, discover vibrant
                  Saskatoon, then saddle up for a few days on a ranch. .
                </p>
              </li>
              <li>
                <p>
                  See plains bison and Canada's prairie landscapes in Grasslands
                  National Park.
                </p>
              </li>
              <li>
                <p>
                  See where the 'Mounties' are trained, discover vibrant
                  Saskatoon, then saddle up for a few days on a ranch. .
                </p>
              </li>
              <li>
                <p>
                  See plains bison and Canada's prairie landscapes in Grasslands
                  National Park.
                </p>
              </li>
              <li>
                <p>
                  See where the 'Mounties' are trained, discover vibrant
                  Saskatoon, then saddle up for a few days on a ranch. .
                </p>
              </li>
              <li>
                <p>
                  See plains bison and Canada's prairie landscapes in Grasslands
                  National Park.
                </p>
              </li>
              <li>
                <p>
                  See where the 'Mounties' are trained, discover vibrant
                  Saskatoon, then saddle up for a few days on a ranch. .
                </p>
              </li>
            </ul>
          </div>

          <div className={classes.dav__single_tour_package_wrapper}>
            <div className={classes.dav__tour_points_wrapper}>
              <div className={classes.dav__tour_points_header}>
                <h5>Price Includes:</h5>
              </div>
              <div className={classes.dav__tour_price_includes}>
                <ul class={classes.dav__tour_price_includes_list}>
                  <li>
                    <span>Scheduled international flights</span>
                  </li>
                  <li>
                    <span>Fully insured vehicle hire</span>
                  </li>
                  <li>
                    <span>All accommodation</span>
                  </li>
                  <li>24-hour support while you travel</li>
                </ul>
                {/* <Button variant="contained" color="primary" className="w-100">
                  Make an enquiry
                </Button> */}
              </div>
            </div>

            <div className={classes.dav__tour_points_wrapper}>
              <div className={classes.dav__tour_points_header}>
                <h5>Price Excludes:</h5>
              </div>
              <div className={classes.dav__tour_price_includes}>
                <ul
                  class={`${classes.dav__tour_price_includes_list} ${classes.dav__price_excludes}`}
                >
                  <li>
                    <span>Scheduled international flights</span>
                  </li>
                  <li>
                    <span>Fully insured vehicle hire</span>
                  </li>
                  <li>
                    <span>All accommodation</span>
                  </li>
                  <li>24-hour support while you travel</li>
                </ul>
                <div className={classes.dav__btn_wrapper}></div>
              </div>
            </div>
          </div>

          <div className={classes.dav__intinary_details} id="itinerary">
            <div className={classes.dav__tour_points_header}>
              <h5>Itinary in details</h5>
            </div>

            <ul className={classes.dav__intinary_list_wrapper}>
              {itinaries.map((itinary, index)=>{
                return(
                  <Itinary key={itinary.id} day={index+1} itinTitle={itinary.title} itinDescription={itinary.description} meal_plan={itinary.Meal_plan} accomodation={itinary.Accommodation}/>
                )
              })}
              
            </ul>
          </div>
        </div>
        <div className={classes.dav__tour_bookings_section}>
          <BookingForm/>
        </div>
      </div>
    </div>
  );
};

export default SingleTour;
