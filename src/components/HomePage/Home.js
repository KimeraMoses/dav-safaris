import React from "react";

//===COMPONENT IMPORTS===
import Wrapper from "../../containers/hoc/wrapper";
import HeroBooking from "../HeroBooking/HeroBooking";
import Benefits from "./Benefits";
import AboutUs from "./AboutUs";
import CountryToursSection from "./CountryTours/CountryToursSection";
import SectionTitle from "./SectionTitle/SectionTitle";
import ToursCardCarousel from "../CardCarousel/CardCarousel";
import { useState } from "react";
import BookingSearchResults from "../HeroBooking/BookingSearchResults";
import Partners from "../Partners/Partners";
import Updates from "../SafariUpdates/Updates";
import Slideshow from "../HeroSection/SlideShow";
import NewsLetterForm from "../ContactUs/NewsLetterForm";
import ModalComponent from "../../components/UI/Modal/ModalComponent";
import Payments from "./Payments";
import SEO from "../../containers/SEO/SEO";
import { useEffect } from "react";
import { useAllTours } from "../../hooks";

const Home = () => {
  const { tours, isLoading } = useAllTours();
  const [searchQ, setSearchQ] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    destination: "",
    duration: "",
    departure: "",
  });
  console.log("All tours", tours);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleOnChange = (event) => {
    setError("");
    setValues({ ...values, error: "" });
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const TourSearchHandler = (e) => {
    e.preventDefault();
    if (
      values.destination.length < 1 ||
      values.duration.length < 1 ||
      values.departure.length < 1
    ) {
      return setError(
        "Please fill all the fields to find a good match for you"
      );
    }

    let FilteredTours = tours.filter(
      (Tour) =>
        Tour.country === values.destination && Tour.duration === values.duration
    );
    setSearchResults(FilteredTours);
    setShow(true);
    setSearchQ({
      destination: values.destination,
      duration: values.duration,
      departure: values.departure,
    });
    setValues({
      destination: "",
      duration: "",
      departure: "",
    });
  };

  return (
    <Wrapper>
      <SEO
        title="Best Safari in Africa, Wildlife Safaris, African Safari Tours, Trip Advisor"
        description="Dav Safaris - Tours and Travel Agency offer the best safari in Africa, wildlife safaris, Gorilla Trekking, Chimpanzee Trekking, and more. All our services are available throughout the year and within your budget."
        keywords="golliras, wildlife ,Chimpanzee ,uganda safaris,gorilla safaris,gorilla trekking uganda,gorilla safaris uganda,uganda safari tours,gorilla tours,gorilla trekking,uganda gorilla tours,uganda tours,uganda wildlife,gorilla trekking safaris,uganda wildlife safari,gorilla trekking tours,african gorilla tours,uganda gorilla,uganda gorilla safari tours,african gorilla safari,gorilla safari tours in uganda,uganda safaris and tours,uganda gorilla trekking tours,gorilla trekking trip,gorilla trekking safaris in uganda,gorilla trips uganda,tours in uganda,uganda gorilla trekking safaris,gorilla safaris tours,wildlife safaris,gorilla trek uganda,gorilla trekking safaris uganda,african wildlife,african tours,gorilla uganda safari,african wildlife safari,safaris tours,african wildlife tours,wild safari tours,african wild tours,wild gorilla safaris,wildlife uganda,african safari uganda,trek gorilla safaris,wildlife tours uganda,gorilla in uganda safari,wildlife safari tours,gorilla trekking uganda tours,uganda safari gorilla,the wilds tours,uganda wildlife tours,gorillas in uganda tour,trekking uganda,african gorilla,wildlife tours,trekking tours,uganda safari trips,wildlife trekking,the wilds safari tour,wild trek tours,wildlife trips,african wildlife safari tours,african safaris, best safari in africa"
      />
      <ModalComponent open={open} setOpen={setOpen} />
      <Slideshow />
      <HeroBooking
        values={values}
        error={error}
        handleOnChange={handleOnChange}
        TourSearchHandler={TourSearchHandler}
      />
      {show && (
        <BookingSearchResults searchQ={searchQ} searchResults={searchResults} />
      )}
      <AboutUs />
      <Benefits />
      <SectionTitle subTitle="Take a look at our" Title="Most popular tours" />
      <ToursCardCarousel tours={tours} isLoading={isLoading} />
      <CountryToursSection />
      <Updates />
      <Partners />
      <Payments />
      <NewsLetterForm />
    </Wrapper>
  );
};
export default Home;
