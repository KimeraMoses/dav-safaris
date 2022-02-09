import React from "react";
import { Col, Row } from "react-bootstrap";
import SectionTitle from "../SectionTitle/SectionTitle";
import CountryCard from "./CountryCard";
import UgandaImage from "../../../assets/uganda-safaris.jpeg";
import KenyaImage from "../../../assets/kenya-safaris.jpeg";
import RwandaImage from "../../../assets/rwanda-safaris.JPEG";
import TanzaniaImage from "../../../assets/tanzania-safaris.JPEG";
import classes from "./CountyToursSection.module.css";

const CountyToursSection = () => {

  return (
    <div className={classes.dav__country_tour_section_wrapper}>
      <SectionTitle subTitle="Find a tour by" Title="Destination" />
      <Row className={classes.dav__country_tour_section_row}>
        <Col lg={3} sm={12} className={classes.dav__country_tour_card_wrapper}>
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
        </Col>
      </Row>
    </div>
  );
};

export default CountyToursSection;
