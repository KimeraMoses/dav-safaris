import React from "react";
import PopularTours from "../HomePage/PopularTours/PopularTours";
import SectionTitle from "../HomePage/SectionTitle/SectionTitle";
import { useCountryTours } from "../../hooks";

const CountryTours = ({ Country }) => {
  const { countryTours, isLoading } = useCountryTours(Country);

  return (
    <div>
      <SectionTitle
        subTitle="Take a look at our"
        Title={`Popular tours in ${Country}`}
        isLoading={isLoading}
      />
      <PopularTours tours={countryTours} isLoading={isLoading} />
    </div>
  );
};

export default CountryTours;
