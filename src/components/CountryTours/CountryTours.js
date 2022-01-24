import React from "react";
import { useSelector } from "react-redux";
import PopularTours from "../HomePage/PopularTours/PopularTours";
import SectionTitle from "../HomePage/SectionTitle/SectionTitle";
import classes from "./CountryTours.module.css";

const CountryTours = (props) => {
  const Tours = useSelector((state) => state.tours.countryTours);

  return (
    <div className={classes.dav__country_tours_wrapper}>
      <SectionTitle subTitle="Take a look at our" Title="Popular tours in uganda" />
        <PopularTours Tours = {Tours}/>
    </div>
  );
};

export default CountryTours;
