import React from "react";
import classes from "./CountryHeader.module.css";

import { Link } from "react-router-dom";
import { useAllCategories } from "../../hooks";

const CountryHeader = (props) => {
  const { categories } = useAllCategories();
  let tourCategories = categories?.filter(
    (category) => category?.country?.id === props.Country?.id
  );
  const { Country } = props;
  return (
    <div className={classes.dav__country_header_section}>
      <div className={classes.dav__section__hdr}>
        <h2>Where you can travel with us in {Country && Country.name}</h2>
        <p>{Country?.summary}</p>
      </div>
      <div className={classes.dav__country_safaris_category}>
        {tourCategories?.map((category, index) => {
          return (
            <Link
              key={index}
              to={`/${Country?.slug}/${category.slug}`}
              className={classes.dav__category_card}
            >
              <img src={category.tourCategoryImage} alt={category.name} />
              <h5>{category.name}</h5>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CountryHeader;
