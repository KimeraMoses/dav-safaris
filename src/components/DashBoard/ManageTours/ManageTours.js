import React, { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { itinaries } from "../../Tours/SingleTour/SingleTour";
import DashTourCard from "./DashTourCard";
import tourImage from "../../../assets/Image3.jpg";
import classes from "./ManageTours.module.css";
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
  const isLoading = useSelector((state) => state.tour.isLoading);
  const TourList = useSelector((state) => state.tours.toursList);
  const [country, setCountry] = useState("Filter by country");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTours());
  }, []);
  let FilteredTours = TourList;
  const onAddNewClick =()=>{
    setAddNew(true)
  }
  const onEditClick = (tourId) => {
    setIsEdit(true);
    dispatch(fetchTourDetails(tourId));
  };
  const onDeleteClick = (tourId) => {
    dispatch(DeleteTour(tourId));
    dispatch(fetchAllTours());
  };


  if (country === "Filter by country") {
    FilteredTours = TourList;
  } else {
    FilteredTours = TourList.filter((tour) => tour.country === country);
  }
  
  const SearchHandler = (e) => {
    const { name, value } = e.target;
    setSearchTerm(value);

    if (searchTerm !== "") {
      const Results = FilteredTours.filter((Result) => {
        return Object.values(Result)
          .join(" ")
          .replaceAll('-',' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(Results);
    }
  };

  useEffect(() => {
    setSearchTerm("");
    setSearchResults([]);
  }, [country]);

  useEffect(() => {
    setSearchResults([]);
  }, [searchTerm.length < 1]);

  const RenderedList = (searchResults.length > 0 ? searchResults : FilteredTours).map((tour) => {
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
            Tour={tour}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        </List>
      </Col>
    );
  });

  return (
    <Container className={classes.dav__manage_tours_wrapper}>
      <TourFilters
        addNew={addNew}
        setAddNew={setAddNew}
        Country={country}
        setCountry={setCountry}
        searchTerm={searchTerm}
        SearchHandler={SearchHandler}
      />
      {addNew ? (
        <div className={classes.dav__new_tour_form_wrapper}>
          {isLoading ? (
            <Spinner />
          ) : (
            <NewTour isEdit={isEdit} setIsEdit={setIsEdit} />
          )}
        </div>
      ) : (
        <Row>{RenderedList}</Row>
      )}
    </Container>
  );
};

export default ManageTours;
