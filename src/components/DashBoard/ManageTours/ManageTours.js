import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { itinaries } from "../../Tours/SingleTour/SingleTour";
import DashTourCard from "./DashTourCard";
import tourImage from "../../../assets/Image3.jpg";
import classes from "./ManageTours.module.css";
import ManageTour from "./ManageTour";
import { List } from "@material-ui/core";
import TourFilters from "./TourFilters";
import NewTour from "../../NewItems/NewTour";

const ManageTours = () => {
  const [addNew, setAddNew] = useState(false)
  
  const RenderedList = itinaries.map((tour) => {
    return (
      <Col
        lg={6}
        md={6}
        sm={6}
        xs={12}
        className={classes.gpa__university_card_wrapper}
        key={tour.id}
      >
        <List className={classes.gpa__dashboard_menu_list_item}>
        <DashTourCard
          TourLink={tour.title.replace(/ /g, "-")}
          TourName={tour.title}
          TourLogo={tourImage}
        />
        </List>
      </Col>
    );
  });

  return (
    <Container className={classes.dav__manage_tours_wrapper}>

      <TourFilters addNew={addNew} setAddNew={setAddNew}/>
      {addNew? <div className={classes.dav__new_tour_form_wrapper}><NewTour/></div>: <Row>{RenderedList}</Row>}
      
      {/* <ManageTour/> */}

      
    </Container>
  );
};

export default ManageTours;
