import React from "react";
import { useSelector } from "react-redux";
import PopularTours from "../HomePage/PopularTours/PopularTours";
import SectionTitle from "../HomePage/SectionTitle/SectionTitle";

const CountryTours = (props) => {
  const Tours = useSelector((state) => state.tours.countryTours);

  return (
    <div>
      <SectionTitle
        subTitle="Take a look at our"
        Title={`Popular tours in ${props.Country}`}
      />
      <PopularTours Tours={Tours} />
    </div>
  );
};

export default CountryTours;
