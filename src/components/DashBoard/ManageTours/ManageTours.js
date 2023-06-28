import React, { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import DashTourCard from "./DashTourCard";
import classes from "./ManageTours.module.css";
import { List } from "@material-ui/core";
import TourFilters from "./TourFilters";
import NewTour from "../../NewItems/NewTour";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import DeleteModal from "./Itinary/DeleteModal";
import Loader from "../../../containers/Loader/Loader";
import { useAllTours } from "../../../hooks";

const ManageTours = () => {
  const { tours, isLoading: isFetching } = useAllTours();

  const isLoading = useSelector((state) => state.tour.isLoading);
  const [country, setCountry] = useState("uganda");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTour, setSelectedTour] = useState("");
  const [addNew, setAddNew] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  let FilteredTours = tours;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onEditClick = (tourId) => {
    navigate(`/dashboard/manage-tours/edit?tour=${tourId}`);
  };
  const onDeleteClick = (tourId) => {
    setOpen(true);
    setSelectedTour(tourId);
  };

  if (country === "Filter by country") {
    FilteredTours = tours;
  } else {
    FilteredTours = tours.filter((tour) => tour.country === country);
  }

  const SearchHandler = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    if (searchTerm !== "") {
      const Results = FilteredTours.filter((Result) => {
        return Object.values(Result)
          .join(" ")
          .replaceAll("-", " ")
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

  const isSearching = searchTerm.length < 1 ? true : false;
  useEffect(() => {
    setSearchResults([]);
  }, [isSearching]);

  const RenderedList = (
    searchResults.length > 0 ? searchResults : FilteredTours
  ).map((tour) => {
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
          {isLoading ? <Spinner /> : <NewTour setAddNew={setAddNew} />}
        </div>
      ) : (
        <Row>{isFetching ? <Loader /> : RenderedList}</Row>
      )}
      <DeleteModal
        source="tour"
        open={open}
        setOpen={setOpen}
        Id={selectedTour}
        setSearchTerm={setSearchTerm}
      />
    </Container>
  );
};

export default ManageTours;
