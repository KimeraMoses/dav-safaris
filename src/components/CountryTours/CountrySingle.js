import React, { useEffect } from "react";
import { useParams } from "react-router";
import CountryHeroImg from "../../assets/Image6.jpg";
import PopularTours from "../HomePage/PopularTours/PopularTours";
import CountryHeader from "./CountryHeader";
import AboutCountry from "./AboutCountry";
import classes from "./CountrySingle.module.css";
import CountryTours from "./CountryTours";

const CountrySingle = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { countryName } = useParams();
  return (
    <div className={classes.dav__country_single_wrapper}>
      <div
        className={classes.dav__single_tour_hero}
        style={{
          backgroundImage: `url(${CountryHeroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <h1>{countryName}</h1>
      </div>
      <CountryHeader/>
      <AboutCountry/>
      <CountryTours/>
    </div>
  );
};

export default CountrySingle;
