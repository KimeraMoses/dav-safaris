import { Button } from "@material-ui/core";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SectionTitle from "../HomePage/SectionTitle/SectionTitle";
import TourCardSkeleton from "../Tours/TourCardSkeleton";
import UpdateCard from "./UpdateCard";
import classes from "./Updates.module.css";

const Updates = (props) => {
  const isLoading = useSelector((state) => state.tours.isLoading);
  const Tours = useSelector((state) => state.tours.toursList);
  return (
    <Container fluid className={classes.dav__updates_wrapper}>
      <SectionTitle subTitle="stay updated with" Title="Safari Updates"/>
      <Row className={classes.dav__updates_row_wrapper}>
        {isLoading
          ? [...Array(15).keys()].map((index) => {
              return (
                <Col
                  key={index}
                  lg={3}
                  sm={12}
                  className={classes.dav__updates_card_wrapper}
                >
                  <TourCardSkeleton />
                </Col>
              );
            })
          : Tours &&
            Tours.slice(0,12).map((tour) => {
              return (
                <Col
                  key={tour.id}
                  lg={3}
                  sm={12}
                  className={classes.dav__updates_card_wrapper}
                >
                  <UpdateCard Tour={tour}/>
                </Col>
              );
            })}
      </Row>
      <div className={classes.dav__more_updates_btn_wrapper}>
        <Button variant="outlined" color="primary" component={Link} to="/tours">Load More...</Button>
      </div>
    </Container>
  );
};

export default Updates;

