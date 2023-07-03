import React, { useEffect } from "react";
import { useParams } from "react-router";
// import {
//   TourCategories_Kenya,
//   TourCategories_Rwanda,
//   TourCategories_Tanzania,
//   TourCategories_Uganda,
// } from "../../../containers/Countries/TourCategories";
import classes from "../CountrySingle.module.css";
import PopularTours from "../../HomePage/PopularTours/PopularTours";
import SectionTitle from "../../HomePage/SectionTitle/SectionTitle";
import SEO from "../../../containers/SEO/SEO";
import DescriptionSection from "../DescriptionSection";
import { useCountryTours } from "../../../hooks";
import { useCategoryBySlug } from "../../../hooks";
import { useCountry } from "../../../hooks";

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
  const { category } = useCategoryBySlug(tourCategory);
  // const { categories } = useAllCategories();
  const { country } = useCountry(countryName);

  const currentCountry = country.name;
  // const currentCountry = countryName.split("-")[0];
  useEffect(() => {
    window.scrollTo(0, 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourCategory]);

  const { tours, isLoading } = useCountryTours(currentCountry);
  console.log("country", country, "category", category, "Tours", tours);

  // const SelectedCategory = categories?.filter(
  //   (category) => category.value.toLowerCase() === tourCategory.toLowerCase()
  // )[0];
  const SelectedCategory = category;
  const FilteredTours = tours.filter((tour) => tour.category === tourCategory);

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
          <PopularTours tours={FilteredTours} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
};

export default Category;
