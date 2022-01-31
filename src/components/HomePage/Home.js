import React from "react";

//===COMPONENT IMPORTS===
import Wrapper from "../../containers/hoc/wrapper";
import HeroSection from "../../components/HeroSection/HeroSection";
import HeroBooking from "../HeroBooking/HeroBooking";
import Benefits from "./Benefits";
import AboutUs from "./AboutUs";
import PopularTours from "./PopularTours/PopularTours";
import CountyToursSection from "./CountryTours/CountyToursSection";
import SectionTitle from "./SectionTitle/SectionTitle";
import CardCarousel from "../CardCarousel/CardCarousel";
import { useState } from "react";
import { useSelector } from "react-redux";
import BookingSearchResults from "../HeroBooking/BookingSearchResults";
import Partners from "../Partners/Partners";
import Updates from "../SafariUpdates/Updates";
import Slideshow from "../HeroSection/SlideShow";

const Home = () => {
  const Tours = useSelector((state) => state.tours.toursList);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQ, setSearchQ] = useState({})
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("")
  const [show, setShow] = useState(false)
  const [values, setValues] = useState({
    destination: "",
    duration: "",
    departure: "",
  });
  // let FilteredTours = [];


  const handleOnChange = (event) => {
    setError("")
    setValues({ ...values, error: "" });
    const { name, value } = event.target;
    setValues({ ...values, [name]: event.target.value });
  };

  const TourSearchHandler = (e) => {
    e.preventDefault()
    if (values.destination.length < 1 || values.duration.length<1 || values.departure.length<1) {
      return setError("Please fill all the fields to find a good match for you" );
    }
    
    let FilteredTours = Tours.filter(
      (Tour) =>
        Tour.country === values.destination && Tour.duration === values.duration
    );
    setSearchResults(FilteredTours);
    setShow(true)
    setSearchQ({
      destination: values.destination,
      duration: values.duration,
      departure: values.departure,
    })
    setValues({
      destination: "",
      duration: "",
      departure: "",
    })
  };



  return (
    <Wrapper>
      <Slideshow/>
      {/* <HeroSection /> */}
      <HeroBooking
        values={values}
        error={error}
        handleOnChange={handleOnChange}
        TourSearchHandler={TourSearchHandler}
      />
      {show && <BookingSearchResults searchQ={searchQ} searchResults={searchResults}/>}
      <AboutUs />
      <Benefits />
      <SectionTitle subTitle="Take a look at our" Title="Most popular tours" />
      <CardCarousel />
      <CountyToursSection />
      <Updates/>
      <Partners/>
    </Wrapper>
  );
};
export default Home;
