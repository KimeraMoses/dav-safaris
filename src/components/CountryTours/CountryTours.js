import React from "react";
import PopularTours from "../HomePage/PopularTours/PopularTours";
import SectionTitle from "../HomePage/SectionTitle/SectionTitle";
import classes from "./CountryTours.module.css";

const CountryTours = (props) => {
  return (
    <div className={classes.dav__country_tours_wrapper}>
      <SectionTitle subTitle="Take a look at our" Title="Most popular tours in uganda" />
        <PopularTours/>
    </div>
  );
};

export default CountryTours;
