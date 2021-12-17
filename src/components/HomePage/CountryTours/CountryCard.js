import { Paper } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Country1 from "../../../assets/Image12.jpg";
import classes from "./CountryCard.module.css";

const CountryCard = (props) => {
    const {countryImage,countryTitle,numTours,countyDescription } = props
  return (
    <Paper className={classes.dav__country_card}>
      <Link to="/">
        <img src={countryImage} alt={countryTitle} />
        <div className={classes.dav__country_title_wrapper}>
          <h3 className={classes.dav__country_name}>{countryTitle}</h3>
          {/* <span>{numTours} Tours</span> */}
        </div>
        <div className={classes.dav__country_content}>
          <p>
           {countyDescription}
          </p>
        </div>
      </Link>
    </Paper>
  );
};

export default CountryCard;
