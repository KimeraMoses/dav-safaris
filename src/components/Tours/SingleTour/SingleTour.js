import React, { useEffect } from "react";
import classes from "./SingleTour.module.css";
import singleImage from "../../../assets/dave-safaris-Home-Uganda.jpg";
import { useParams } from "react-router";
import { Button } from "@material-ui/core";

const SingleTour = () => {
  const { tourTitle } = useParams();
  useEffect(()=>{window.scrollTo(0, 0)},[])
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
      <div className={classes.dav__single_tour_jump_to_navigation}>
        <ul className={classes.dav__single_tour_jump_to_links_wrapper}>
          <li>
            <span className={classes.dav__single_tour_jump_label}>
              Jump to:{" "}
            </span>
          </li>
          <li>
            <a href="#description">Description</a>
          </li>
          <li>
            <a href="#itinerary">Itinerary</a>
          </li>
          <li>
            <a href="#reviews">Reviews</a>
          </li>
        </ul>
      </div>

      {/* ====TOUR HIGHLIGHTS==== */}

      <div className={classes.dav__single_tour_highlights_wrapper}>
        <div className={classes.dav__tour_highlights}>
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
            </ul>
          </div>
        </div>
        <div className={classes.dav__tour_points_wrapper}>
          <div className={classes.dav__tour_points_header}>
            <h2>Price Includes:</h2>
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
            <Button variant="contained" color="primary" className="w-100">Make an enquiry</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTour;
