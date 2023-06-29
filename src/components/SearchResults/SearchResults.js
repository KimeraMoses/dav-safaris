import { Paper } from "@material-ui/core";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import TourCard from "../Tours/TourCard";
import TourCardSkeleton from "../Tours/TourCardSkeleton";
import classes from "./SearchResults.module.css";

const SearchResults = ({ Results }) => {
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
          : Results &&
            Results.map((tour) => {
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
        {!isLoading && Results.length < 1 && (
          <Paper className={classes.dav__no_results_found_error_wrapper}>
            {" "}
            No Tours matching your search queries found!
          </Paper>
        )}
      </Row>
    </Container>
  );
};

export default SearchResults;
