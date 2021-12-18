import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { itinaries } from "../../Tours/SingleTour/SingleTour";
import DashTourCard from "./DashTourCard";
import tourImage from "../../../assets/Image3.jpg";
import classes from "./ManageTours.module.css";

const ManageTours = () => {
  const RenderedList = itinaries.map((tour) => {
    return (
      <Col
        lg={4}
        md={4}
        sm={6}
        xs={12}
        className={classes.gpa__university_card_wrapper}
        key={tour.id}
      >
        <DashTourCard
          TourLink={tour.title.replace(/ /g, "-")}
          TourName={tour.title}
          TourLogo={tourImage}
        />
      </Col>
    );
  });

  return (
    <Container className={classes.dav__manage_tours_wrapper}>
      <Row>{RenderedList}</Row>
    </Container>
  );
};

export default ManageTours;
