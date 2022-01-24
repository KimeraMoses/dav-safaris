import React, { useEffect } from "react";
import { useParams } from "react-router";
import CountryHeroImg from "../../assets/Image6.jpg";
import PopularTours from "../HomePage/PopularTours/PopularTours";
import CountryHeader from "./CountryHeader";
import AboutCountry from "./AboutCountry";
import classes from "./CountrySingle.module.css";
import CountryTours from "./CountryTours";
import { fetchAllCountryTours } from "../../store/Actions/TourActions";
import { useDispatch } from "react-redux";
import {CountriesData} from "../../containers/Countries/CountriesData";

const CountrySingle = () => {
  const { countryName } = useParams();
  const dispatch = useDispatch()
  const currentCountry = countryName.split("-")[0]
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchAllCountryTours(currentCountry))
  }, [currentCountry]);
  
  const SelectedCountry = CountriesData.filter((country)=>country.name.toLowerCase()===currentCountry.toLowerCase())[0];
  return (
    <div className={classes.dav__country_single_wrapper}>
      <div
        className={classes.dav__single_tour_hero}
        style={{
          backgroundImage: `url(${SelectedCountry && SelectedCountry.imageCover})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <h1>{currentCountry + " safaris"}</h1>
      </div>
      <CountryHeader Country={SelectedCountry}/>
      <AboutCountry Country={SelectedCountry}/>
      <CountryTours Country={SelectedCountry && SelectedCountry.name}/>
    </div>
  );
};

export default CountrySingle;
