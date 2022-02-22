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
import { CountriesData } from "../../containers/Countries/CountriesData";
import SEO from "../../containers/SEO/SEO";
const CountryTitle = {
  UG: "Uganda Gorilla Safaris, Birding, Cultural Safaris, Mountain Climbing",
  KE: "Kenya Wildlife Safaris, Birding Safaris, Best African Safaris Holidays",
  TZ: "Tanzania Wildlife Safaris, Mountain Hiking, Birdwatching Tours",
  RW: "Rwanda Gorilla Trekking, Rwanda Culture Safaris, Birding Safaris",
};

const CountrySingle = () => {
  const { countryName } = useParams();
  const dispatch = useDispatch();
  const currentCountry = countryName.split("-")[0];
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchAllCountryTours(currentCountry));
  }, [currentCountry]);

  const SelectedCountry = CountriesData.filter(
    (country) => country.name.toLowerCase() === currentCountry.toLowerCase()
  )[0];
  return (
    <>
      <SEO
        title={
          countryName === "uganda-safaris"
            ? CountryTitle.UG
            : countryName === "kenya-safaris"
            ? CountryTitle.KE
            : countryName === "tanzania-safaris"
            ? CountryTitle.TZ
            : CountryTitle.RW
        }
      />
      <div className={classes.dav__country_single_wrapper}>
        <div
          className={classes.dav__single_tour_hero}
          style={{
            backgroundImage: `url(${
              SelectedCountry && SelectedCountry.imageCover
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <h1>{currentCountry + " safaris"}</h1>
        </div>
        <CountryHeader Country={SelectedCountry} />
        <AboutCountry Country={SelectedCountry} />
        <CountryTours Country={SelectedCountry && SelectedCountry.name} />
      </div>
    </>
  );
};

export default CountrySingle;
