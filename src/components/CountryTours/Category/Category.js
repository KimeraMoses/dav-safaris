import React, { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  TourCategories_Kenya,
  TourCategories_Rwanda,
  TourCategories_Tanzania,
  TourCategories_Uganda,
} from "../../../containers/Countries/TourCategories";
import { fetchAllCountryTours } from "../../../store/Actions/TourActions";
import classes from "../CountrySingle.module.css";
import CountryTours from "../CountryTours";
import PopularTours from "../../HomePage/PopularTours/PopularTours";
import SectionTitle from "../../HomePage/SectionTitle/SectionTitle";

const Category = () => {
  const { countryName, tourCategory } = useParams();
  const Tours = useSelector((state) => state.tours.countryTours);
  const dispatch = useDispatch();
  const currentCountry = countryName.split("-")[0];
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchAllCountryTours(currentCountry));
  }, [currentCountry]);

  const SelectedCategory = TourCategories_Uganda.concat(
    TourCategories_Kenya,
    TourCategories_Rwanda,
    TourCategories_Tanzania
  ).filter(
    (category) => category.value.toLowerCase() === tourCategory.toLowerCase()
  )[0];  
  const FilteredTours = Tours.filter((tour)=>tour.category === tourCategory )
  
  return (
    <div className={classes.dav__country_single_wrapper}>
      <div
        className={classes.dav__single_tour_hero}
        style={{
          backgroundImage: `url(${SelectedCategory && SelectedCategory.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <h1>{SelectedCategory.name}</h1>
      </div>
      <div className={classes.dav__country_tours_wrapper}>
        <SectionTitle
          subTitle="Exciting tours in "
          Title={`${SelectedCategory && SelectedCategory.name} Category`}
        />
        <PopularTours Tours={FilteredTours} />
      </div>
    </div>
  );
};

export default Category;
