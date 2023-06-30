import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import TourCard from "../../Tours/TourCard";
import classes from "./PopularTours.module.css";
import TourCardSkeleton from "../../Tours/TourCardSkeleton";

const PopularTours = ({ tours, isLoading }) => {
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
          : tours &&
            tours.map((tour) => {
              return (
                <Col
                  key={tour.id}
                  lg={3}
                  sm={12}
                  className={classes.dav__popular_tour_card_wrapper}
                >
                  <TourCard tour={tour} />
                </Col>
              );
            })}
      </Row>
    </Container>
  );
};

export default PopularTours;
