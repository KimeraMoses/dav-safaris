import React from "react";
import classes from "./CountryHeader.module.css";

import { Link } from "react-router-dom";

const CountryHeader = (props) => {
  const { Country } = props;
  return (
    <div className={classes.dav__country_header_section}>
      <div className={classes.dav__section__hdr}>
        <h2>Where you can travel with us in {Country && Country.name}</h2>
        <p>{Country?.summary}</p>
      </div>
      <div className={classes.dav__country_safaris_category}>
        {Country &&
          Country.tourCategories.map((category, index) => {
            return (
              <Link
                key={index}
                to={`/${Country.slug}/${category.value}`}
                className={classes.dav__category_card}
              >
                <img src={category.image} alt={category.name} />
                <h5>{category.name}</h5>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default CountryHeader;
