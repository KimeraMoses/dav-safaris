import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTours } from "../../../store/Actions/TourActions";
import TourFilters from "../../TourFilters/TourFilters";
import TourCard from "../TourCard";
import TourCardSkeleton from "../TourCardSkeleton";
import classes from "./Tour.module.css";

const Tours = () => {
  const Tours = useSelector((state) => state.tours.toursList);
  const isLoading = useSelector((state) => state.tours.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchAllTours());
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [values, setValues] = useState({
    duration: "",
    selectedCategory: "",
    selectedCountry: "",
  });
  const isFiltered =
    values.duration || values.selectedCategory || values.selectedCountry;
  let FilteredTours = Tours;

  const filterChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setSearchTerm("");
  };

  if (values.duration) {
    FilteredTours = FilteredTours.filter(
      (tour) => tour.duration === values.duration
    );
  }
  if (values.selectedCategory) {
    FilteredTours = FilteredTours.filter(
      (unit) => unit.category === values.selectedCategory
    );
  }
  if (values.selectedCountry) {
    FilteredTours = FilteredTours.filter(
      (tour) => tour.country === values.selectedCountry
    );
  }

  const userSearchHandler = (e) => {
    const { name, value } = e.target;
    setSearchTerm(value);

    if (searchTerm !== "") {
      const Results = FilteredTours.filter((Result) => {
        return Object.values(Result)
          .join(" ")
          .replace(/-/g, " ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(Results);
    }
  };

  useEffect(() => {
    setSearchResults([]);
  }, [searchTerm.length < 1]);

  return (
    <div className={classes.dav__all_tours_page_wrapper}>
      <div className={classes.dav__all_tours_search_area}>
        <TourFilters
          userSearchHandler={userSearchHandler}
          filterChangeHandler={filterChangeHandler}
          searchTerm={searchTerm}
          duration={values.duration}
          selectedCountry={values.selectedCountry}
          selectedCategory={values.selectedCategory}
        />
      </div>
      <Container fluid className={classes.dav__tours_wrapper}>
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
            : (searchResults.length > 0 ? searchResults : FilteredTours).map(
                (tour) => {
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
                }
              )}
          {!isLoading && FilteredTours.length < 1 && isFiltered && (
            <div className={classes.dav__no_results_wrapper}>
              <Paper className={classes.dav__no_results_found_error_wrapper_inner} >No Tours matching your search queries found!</Paper>
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Tours;
