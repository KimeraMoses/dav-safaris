import React from "react";
import { useParams } from "react-router";
import classes from "./CountryHeader.module.css";
import CatImg from "../../assets/image-1.jpg"
import BirdImg from "../../assets/Image18.jpg"
import CultureImg from "../../assets/Culture.jpg"
import MountImg from "../../assets/Mountains.jpg"
import { Link } from "react-router-dom";

const CountryHeader = () => {
    const { countryName } = useParams();
  return (
    <div className={classes.dav__country_header_section}>
        <div className={classes.dav__section__hdr}>
          <h2>Where you can travel with us in {countryName}</h2>
          <p>
            Our specialists can help you plan your trip, individually focusing
            on your tastes and interests, to the destinations below.
          </p>
        </div>
        <div className={classes.dav__country_safaris_category}>
            <Link to="?tour-cat=golliras" className={classes.dav__category_card}>
                <img src={CatImg} />
                <h5>Gorilla &amp; Wildlife Safaris</h5>
            </Link>
            <Link to="?tour-cat=birding" className={classes.dav__category_card}>
                <img src={BirdImg} />
                <h5>Uganda Birding Safaris</h5>
            </Link>
            <Link to="?tour-cat=culture" className={classes.dav__category_card}>
                <img src={CultureImg} />
                <h5>Uganda Cultural Tours</h5>
            </Link>
            <Link to="?tour-cat=mountaineering" className={classes.dav__category_card}>
                <img src={MountImg} />
                <h5>Mountaineering</h5>
            </Link>
        </div>
    </div>
  );
};

export default CountryHeader;
