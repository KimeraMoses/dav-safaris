import { Paper } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import classes from "./CountryCard.module.css";

const CountryCard = (props) => {
  const { countryImage, countryTitle, countyDescription, countrySlug } = props;
  return (
    <Link to={`${countrySlug}`}>
      <Paper
        className={classes.dav__country_card}
        style={{
          backgroundImage: `url(${countryImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        {/* <img src={countryImage} alt={countryTitle} /> */}
        <div className={classes.dav__country_title_wrapper}>
          <h3 className={classes.dav__country_name}>{countryTitle}</h3>
        </div>
        <div className={classes.dav__country_content}>
          <p>{countyDescription}</p>
        </div>
      </Paper>
    </Link>
  );
};

export default CountryCard;
