import React, { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { itinaries } from "../../Tours/SingleTour/SingleTour";
import DashTourCard from "./DashTourCard";
import tourImage from "../../../assets/Image3.jpg";
import classes from "./ManageTours.module.css";
import ManageTour from "./ManageTour";
import { List } from "@material-ui/core";
import TourFilters from "./TourFilters";
import NewTour from "../../NewItems/NewTour";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  DeleteTour,
  fetchAllTours,
  fetchTourDetails,
} from "../../../store/Actions/TourActions";

const ManageTours = () => {
  const isLoading = useSelector(state=>state.tour.isLoading)
  const [addNew, setAddNew] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTours());
  }, []);
  const TourList = useSelector((state) => state.tours.toursList);

  const onEditClick = (tourId) => {
    console.log("Selected Id", tourId);
    setAddNew(true);
    dispatch(fetchTourDetails(tourId));
  };
  const onDeleteClick=(tourId)=>{
    dispatch(DeleteTour(tourId));
    dispatch(fetchAllTours());
  }

  const RenderedList = TourList.map((tour) => {
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
          <DashTourCard Tour={tour} onEditClick={onEditClick} onDeleteClick={onDeleteClick}/>
        </List>
      </Col>
    );
  });

  return (
    <Container className={classes.dav__manage_tours_wrapper}>
      <TourFilters addNew={addNew} setAddNew={setAddNew} />
      {addNew ? (
        <div className={classes.dav__new_tour_form_wrapper}>
          {isLoading? <Spinner/>: <NewTour isEdit={addNew} setIsEdit={setAddNew}/>}
        </div>
      ) : (
        <Row>{RenderedList}</Row>
      )}
    </Container>
  );
};

export default ManageTours;
