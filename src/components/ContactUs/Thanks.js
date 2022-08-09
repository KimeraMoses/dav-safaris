import React from "react";
import image from "../../assets/background.webp";
import Vid4 from "../../assets/Vid4.mp4";
import Vid5 from "../../assets/Vid5.mp4";
import classes from "./AboutUs.module.css";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import SEO from "../../containers/SEO/SEO";

const Thanks = () => {
  return (
    <>
      <SEO
        title="Thank You"
        description="Thank You"
        keywords="African Safaris, Gorilla Safaris"
      />
      <div className={classes.about_us_wrapper}>
        <div
          className={classes.dav__about_us_hero}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <div className={classes.dav__about_us_title}>
            <h2>Thanks For Contacting Us. Our Repersentative Will Contact You Shortly.</h2>
          </div>
        </div>
        </div>
    </>
  );
};

export default Thanks;
