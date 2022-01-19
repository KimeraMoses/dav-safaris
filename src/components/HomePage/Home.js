import React from "react";

//===COMPONENT IMPORTS===
import Wrapper from "../../containers/hoc/wrapper";
import HeroSection from "../../components/HeroSection/HeroSection"
import HeroBooking from "../HeroBooking/HeroBooking";
import Benefits from "./Benefits";
import AboutUs from "./AboutUs";
import PopularTours from "./PopularTours/PopularTours";
import CountyToursSection from "./CountryTours/CountyToursSection";
import SectionTitle from "./SectionTitle/SectionTitle";
import CardCarousel from "../CardCarousel/CardCarousel";

const Home = () => {
  return (
    <Wrapper>
      <HeroSection/>
      <HeroBooking/>
      <AboutUs/>
      <Benefits/>
      <SectionTitle
        subTitle="Take a look at our"
        Title ="Most popular tours"
    />
      {/* <PopularTours/> */}
      <CardCarousel/>
      <CountyToursSection/>
    </Wrapper>
  );
};
export default Home;
