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
import TourCardSkeleton from "../../Tours/TourCardSkeleton";

const PopularTours = (props) => {
  const PopularTours = useSelector((state) => state.tours.toursList);
  const { Tours } = props
  const isLoading = useSelector((state) => state.tours.isLoading);
  return (
    <Container fluid className={classes.dav__popular_tours_wrapper}>
      <Row className={classes.dav__popular_tours_row_wrapper}>
        {isLoading
          ? [...Array(15).keys()].map((index) => {
              return (
                <Col
                  key={index}
                  lg={3}
                  sm={12}
                  className={classes.dav__popular_tour_card_wrapper}
                >
                  <TourCardSkeleton />
                </Col>
              );
            })
          : Tours &&
            Tours.map((tour) => {
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
      </Row>
    </Container>
  );
};

export default PopularTours;
