import React from "react";

//===COMPONENT IMPORTS===
import Wrapper from "../../containers/hoc/wrapper";
import HeroBooking from "../HeroBooking/HeroBooking";
import Benefits from "./Benefits";
import AboutUs from "./AboutUs";
import CountyToursSection from "./CountryTours/CountyToursSection";
import SectionTitle from "./SectionTitle/SectionTitle";
import CardCarousel from "../CardCarousel/CardCarousel";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import BookingSearchResults from "../HeroBooking/BookingSearchResults";
import Partners from "../Partners/Partners";
import Updates from "../SafariUpdates/Updates";
import Slideshow from "../HeroSection/SlideShow";
import NewsLetterForm from "../ContactUs/NewsLetterForm";
import ModalComponent from "../../components/UI/Modal/ModalComponent";
import Payments from "./Payments";

const Home = () => {
  const Tours = useSelector((state) => state.tours.toursList);
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

  // const [scrollPosition, setScrollPosition] = useState(0);
  // const handleScroll = () => {
  //   const position = window.pageYOffset;
  //   setScrollPosition(position);
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  // useEffect(() => {
  //   console.log(scrollPosition);
  //   if (scrollPosition>4410) {
  //     setOpen(true);
  //     console.log("Reached bottom");
  //     console.log("Reacehd bottomssss");
  //   }
  // }, [scrollPosition]);

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

    let FilteredTours = Tours.filter(
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
      <Helmet>
        <title>
          Uganda Safaris, Gorilla Trekking, African Wildlife Safaris
        </title>
        <meta
          name="description"
          content="Get Gorilla Trekking Tours and Wildlife Safaris In Africa, we're Travel Agency in Uganda rendering mountain gorilla Trekking tours, birding, wildlife safaris"
        />
        <meta
          name="keywords"
          content="golliras,wildlife ,Chimpanzee ,uganda safaris,gorilla safaris,gorilla trekking uganda,gorilla safaris uganda,uganda safari tours,gorilla tours,gorilla trekking,uganda gorilla tours,uganda tours,uganda wildlife,gorilla trekking safaris,uganda wildlife safari,gorilla trekking tours,african gorilla tours,uganda gorilla,uganda gorilla safari tours,african gorilla safari,gorilla safari tours in uganda,uganda safaris and tours,uganda gorilla trekking tours,gorilla trekking trip,gorilla trekking safaris in uganda,gorilla trips uganda,tours in uganda,uganda gorilla trekking safaris,gorilla safaris tours,wildlife safaris,gorilla trek uganda,gorilla trekking safaris uganda,african wildlife,african tours,gorilla uganda safari,african wildlife safari,safaris tours,african wildlife tours,wild safari tours,african wild tours,wild gorilla safaris,wildlife uganda,african safari uganda,trek gorilla safaris,wildlife tours uganda,gorilla in uganda safari,wildlife safari tours,gorilla trekking uganda tours,uganda safari gorilla,the wilds tours,uganda wildlife tours,gorillas in uganda tour,trekking uganda,african gorilla,wildlife tours,trekking tours,uganda safari trips,wildlife trekking,the wilds safari tour,wild trek tours,wildlife trips,african wildlife safari tours,african safaris"
        />
      </Helmet>
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
      <CardCarousel />
      <CountyToursSection />
      <Updates />
      <Partners />
      <Payments />
      <NewsLetterForm />
    </Wrapper>
  );
};
export default Home;
