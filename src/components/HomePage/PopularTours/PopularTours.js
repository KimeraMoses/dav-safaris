import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TourCard from "../../Tours/TourCard";
import classes from "./PopularTours.module.css";
import Image1 from "../../../assets/Image5.jpg";
import Image2 from "../../../assets/Image6.jpg";
import Image3 from "../../../assets/Image8.jpg";
import Image4 from "../../../assets/Image18.jpg";
import SectionTitle from "../SectionTitle/SectionTitle";
import { useSelector } from "react-redux";
import CardCarousel from "../../CardCarousel/CardCarousel";

const PopularTours = () => {
  const PopularTours = useSelector((state) => state.tours.toursList);
  return (
    <Container fluid className={classes.dav__popular_tours_wrapper}>
      <Row className={classes.dav__popular_tours_row_wrapper}>
        {PopularTours &&
          PopularTours.map((tour) => {
            return (
              <Col
                key={tour.id}
                lg={3}
                sm={12}
                className={classes.dav__popular_tour_card_wrapper}
              >
                <TourCard
                  TourImage={tour.imageCover}
                  TourTitle={tour.name}
                  TourSlug={tour.slug}
                  NumDays={tour.duration}
                  NumNights={tour.duration - 1}
                  TourDescription={tour.description}
                  TourRating={tour.ratingsAverage}
                />
              </Col>
            );
          })}
        <Col lg={3} sm={12} className={classes.dav__popular_tour_card_wrapper}>
          <TourCard
            TourImage={Image1}
            TourTitle="15 Days Gorilla Safari and wildlife in Uganda"
            NumDays={3}
            NumNights={2}
            TourDescription="15 days adventure in Uganda will take you to Murchison Falls National park for hiking"
          />
        </Col>
        <Col lg={3} sm={12} className={classes.dav__popular_tour_card_wrapper}>
          <TourCard
            TourImage={Image2}
            TourTitle="9 Days Best of the Uganda Safari with Gorillas"
            NumDays={9}
            NumNights={8}
            TourDescription="This 9 days Best of Uganda Wildlife safari takes you to see some of the best that Uganda has to offer"
          />
        </Col>
        <Col lg={3} sm={12} className={classes.dav__popular_tour_card_wrapper}>
          <TourCard
            TourImage={Image3}
            TourTitle="10 days Uganda Safari Gorilla, Wildlife and Chimpanzees"
            NumDays={10}
            NumNights={9}
            TourDescription="10 days safari in Uganda you will experience the famous Big fives in Murchison falls"
          />
        </Col>
        <Col lg={3} sm={12} className={classes.dav__popular_tour_card_wrapper}>
          <TourCard
            TourImage={Image4}
            TourTitle="20 Days Best of Uganda Bird Watching Safari"
            NumDays={20}
            NumNights={19}
            TourDescription="Uganda being a home to over 1000 bird species, the country is appreciated"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default PopularTours;
