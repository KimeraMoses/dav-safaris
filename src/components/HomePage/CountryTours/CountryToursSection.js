import React, { useRef } from "react";
import { Row } from "react-bootstrap";
import SectionTitle from "../SectionTitle/SectionTitle";
import CountryCard from "./CountryCard";

import classes from "./CountyToursSection.module.css";
import { useAllCountries } from "../../../hooks";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
const NavigationButton = (props) => <button>{props.children}</button>;

const CountryToursSection = () => {
  const slideRef = useRef();
  const { countries } = useAllCountries();
  const breakpoints = [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },

    {
      breakpoint: 780,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ];

  return (
    <div className={classes.dav__country_tour_section_wrapper}>
      <SectionTitle subTitle="Find a tour by" Title="Destination" />
      <Row className={classes.dav__country_tour_section_row}>
        <Slide
          arrows={true}
          duration={2000}
          indicators={true}
          responsive={breakpoints}
          autoplay={true}
          defaultIndex={0}
          nextArrow={
            <NavigationButton>
              <ArrowForwardIos
                style={{
                  backgroundColor: "#5bc787",
                  borderRadius: "50%",
                  height: "50px",
                  width: "50px",
                  padding: "12px",
                  position: "absolute",
                  right: "5px",
                }}
                onClick={() => slideRef.current.goNext()}
              />
            </NavigationButton>
          }
          prevArrow={
            <NavigationButton>
              <ArrowBackIos
                style={{
                  backgroundColor: "#5bc787",
                  borderRadius: "50%",
                  height: "50px",
                  width: "50px",
                  padding: "12px",
                  position: "absolute",
                  left: "5px",
                  zIndex: "999",
                }}
                onClick={() => slideRef.current.goBack()}
              />
            </NavigationButton>
          }
          ref={slideRef}
          className={classes.dav__country_tour_card_wrapper}
        >
          {countries.map((country, index) => (
            <div className="each-slide-effect" key={index}>
              <CountryCard
                key={index}
                countryImage={country.countryImage}
                countryTitle={country.name}
                countrySlug={country.slug}
                numTours={10}
                countyDescription={country.summary}
              />
            </div>
          ))}
        </Slide>
        {/* <Col lg={3} sm={12} className={classes.dav__country_tour_card_wrapper}>
          <CountryCard
            countryImage={UgandaImage}
            countryTitle="Uganda"
            numTours={10}
            countyDescription="The unleveled and unique destination blessed with undeniable culture and natural beauty"
          />
        </Col>
        <Col lg={3} sm={12} className={classes.dav__country_tour_card_wrapper}>
          <CountryCard
            countryImage={RwandaImage}
            countryTitle="Rwanda"
            numTours={12}
            countyDescription="Best known for its friendly people and stunning views of the great rift valley which makes it the most remarkable country in the world"
          />
        </Col>
        <Col lg={3} sm={12} className={classes.dav__country_tour_card_wrapper}>
          <CountryCard
            countryImage={KenyaImage}
            countryTitle="Kenya"
            numTours={9}
            countyDescription="Enjoy unmatched series of big fives at the world's most epic natural wonders alongside the breathtaking views of birds, and sand beaches"
          />
        </Col>
        <Col lg={3} sm={12} className={classes.dav__country_tour_card_wrapper}>
          <CountryCard
            countryImage={TanzaniaImage}
            countryTitle="Tanzania"
            numTours={5}
            countyDescription="Visit Tanzania for an exceptional beach experience in Zanzibar, Hike kilimanjaro mountain, visit the serengeti commonly known safari mecca for its variety of wildlife species"
          />
        </Col> */}
      </Row>
    </div>
  );
};

export default CountryToursSection;
