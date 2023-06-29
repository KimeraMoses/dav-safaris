import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
// import {
//   TourCategories_Kenya,
//   TourCategories_Rwanda,
//   TourCategories_Tanzania,
//   TourCategories_Uganda,
// } from "../../../containers/Countries/TourCategories";
import { fetchAllCategories } from "../../../store/Actions/TourCategoriesActions";
import { fetchAllCountryTours } from "../../../store/Actions/TourActions";
import classes from "../CountrySingle.module.css";
import PopularTours from "../../HomePage/PopularTours/PopularTours";
import SectionTitle from "../../HomePage/SectionTitle/SectionTitle";
import SEO from "../../../containers/SEO/SEO";
import DescriptionSection from "../DescriptionSection";
import { selectAllCategories } from "../../../store/Slices/fetchCategoriesSlice";

const categoryMeta = {
  "tanzania-wildlife-safaris": {
    title: "Wildlife Safaris Tanzania, Luxury Wildlife Park in Tanzania",
    description:
      "Wildlife safaris Tanzania offers adventurous travelers the opportunity to see Tanzania's amazing wildlife park and visit spectacular natural beauty.",
    keywords: "wildlife park in tanzania, wildlife safaris tanzania",
  },
  "kenya-wildlife-safaris": {
    title: "Kenya Wildlife Safaris, Kenya Wildlife Tours & Travels",
    description:
      "Our Kenya wildlife safaris offer you enjoy your holiday at the best destination in Kenya. Visit us and experience incredible wildlife at an affordable cost.",
    keywords: "kenya wildlife safaris, kenya wildlife safari",
  },
  "rwanda-gorilla-wildlife-safaris": {
    title: "Gorilla Safaris in Rwanda, Gorilla Safaris Tour & Travels Rwanda",
    description:
      "Tours and Travel Agency offer the best luxurious gorilla safaris in Rwanda. Plan your trip with us and enjoy gorilla Rwanda wildlife Safaris.",
    keywords: "gorilla safaris in rwanda",
  },
};

const Category = () => {
  const { countryName, tourCategory } = useParams();
  const Tours = useSelector((state) => state.tours.countryTours);
  const Categories = useSelector(selectAllCategories);
  const dispatch = useDispatch();
  const currentCountry = countryName.split("-")[0];
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchAllCountryTours(currentCountry));
    dispatch(fetchAllCategories());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCountry]);
  console.log(Categories?.categories);
  const SelectedCategory = Categories?.categories?.filter(
    (category) => category.value.toLowerCase() === tourCategory.toLowerCase()
  )[0];
  const FilteredTours = Tours?.filter((tour) => tour.category === tourCategory);

  console.log(SelectedCategory);

  return (
    <>
      {categoryMeta[tourCategory] && (
        <SEO
          title={categoryMeta[tourCategory]?.title}
          description={categoryMeta[tourCategory]?.description}
          keywords={categoryMeta[tourCategory]?.keywords}
        />
      )}
      <div className={classes.dav__country_single_wrapper}>
        <div
          className={classes.dav__single_tour_hero}
          style={{
            backgroundImage: `url(${
              SelectedCategory && SelectedCategory.tourCategoryImage
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          <h1>{SelectedCategory?.name}</h1>
        </div>
        <div className={classes.dav__country_tours_wrapper}>
          {SelectedCategory?.description && (
            <DescriptionSection
              description={SelectedCategory.description}
              specialist="+256757795781"
            />
          )}
          <SectionTitle
            subTitle="Exciting tours in "
            Title={`${SelectedCategory && SelectedCategory.name} Category`}
          />
          <PopularTours Tours={FilteredTours} />
        </div>
      </div>
    </>
  );
};

export default Category;
