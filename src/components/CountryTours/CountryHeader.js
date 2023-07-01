import React from "react";
import classes from "./CountryHeader.module.css";
// import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
// import { selectAllCategories } from "../../store/Slices/fetchCategoriesSlice";
import { useAllCategories } from "../../hooks";

const CountryHeader = (props) => {
  // const fetchedCategories = useSelector(selectAllCategories);
  // let categories = fetchedCategories.categories;
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
              to={`/${Country?.slug}/${category.value}`}
              className={classes.dav__category_card}
            >
              <img src={category.tourCategoryImage} alt={category.name} />
              <h5>{category.name}</h5>
            </Link>
          );
        })}
        {/* <Link to="?tour-cat=golliras" className={classes.dav__category_card}>
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
        <Link
          to="?tour-cat=mountaineering"
          className={classes.dav__category_card}
        >
          <img src={MountImg} />
          <h5>Mountaineering</h5>
        </Link> */}
      </div>
    </div>
  );
};

export default CountryHeader;
