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
import { useSelector } from "react-redux";
import BookingSearchResults from "../HeroBooking/BookingSearchResults";
import Partners from "../Partners/Partners";
import Updates from "../SafariUpdates/Updates";
import Slideshow from "../HeroSection/SlideShow";
import NewsLetterForm from "../ContactUs/NewsLetterForm";
import ModalComponent from "../../components/UI/Modal/ModalComponent";
import Payments from "./Payments";
import SEO from "../../containers/SEO/SEO";

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
      <SEO
        title="Africa Safari | Wildlife Safaris | Gorilla Trekking | Chimpanzee Trekking| Gorilla Trekking Uganda | Tanzania Safari | Kenya Safaris | Gorilla trekking Rwanda |African Wildlife Safari park | African Safari tours | trip advisor"
        description="Tours and Travel Agency based in Uganda rendering mountain gorilla Trekking experience, birding and wildlife safaris doubled with a range of services including mountaineering , white water rafting and culture and community tours among others in Uganda and the entire East African Countries offering tailor made services suiting all travel budgets. We pride ourselves in ensuring convenient safaris based on our guest requests in terms of budget, time and travel needs to enjoy your African safari. Mountain Gorilla trekking in Uganda and Rwanda, wild beast Migration in Tanzania and Kenya, Rwenzori and Kirimanjaro Mountain Hiking experiences and white water rafting adventure along the Nile River. Our excellent team of Safari guides is capable to make your safari a lifetime experience accompanied by the great and mechanically sounding fleet. All our services are available throughout the year with the best time being December to January and June to August."
        keywords="golliras,wildlife ,Chimpanzee ,uganda safaris,gorilla safaris,gorilla trekking uganda,gorilla safaris uganda,uganda safari tours,gorilla tours,gorilla trekking,uganda gorilla tours,uganda tours,uganda wildlife,gorilla trekking safaris,uganda wildlife safari,gorilla trekking tours,african gorilla tours,uganda gorilla,uganda gorilla safari tours,african gorilla safari,gorilla safari tours in uganda,uganda safaris and tours,uganda gorilla trekking tours,gorilla trekking trip,gorilla trekking safaris in uganda,gorilla trips uganda,tours in uganda,uganda gorilla trekking safaris,gorilla safaris tours,wildlife safaris,gorilla trek uganda,gorilla trekking safaris uganda,african wildlife,african tours,gorilla uganda safari,african wildlife safari,safaris tours,african wildlife tours,wild safari tours,african wild tours,wild gorilla safaris,wildlife uganda,african safari uganda,trek gorilla safaris,wildlife tours uganda,gorilla in uganda safari,wildlife safari tours,gorilla trekking uganda tours,uganda safari gorilla,the wilds tours,uganda wildlife tours,gorillas in uganda tour,trekking uganda,african gorilla,wildlife tours,trekking tours,uganda safari trips,wildlife trekking,the wilds safari tour,wild trek tours,wildlife trips,african wildlife safari tours,african safaris"
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
