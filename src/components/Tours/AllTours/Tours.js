import { Paper } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import TourFilters from "../../TourFilters/TourFilters";
import TourCard from "../TourCard";
import TourCardSkeleton from "../TourCardSkeleton";
import classes from "./Tour.module.css";
import { useAllTours } from "../../../hooks";

const Tours = () => {
  const { tours, isLoading } = useAllTours();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [values, setValues] = useState({
    duration: "",
    selectedCategory: "",
    selectedCountry: "",
  });
  const isFiltered =
    values.duration || values.selectedCategory || values.selectedCountry;
  let FilteredTours = tours;

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
    const { value } = e.target;
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
  const notSearching = searchTerm.length < 1 ? true : false;
  useEffect(() => {
    setSearchResults([]);
  }, [notSearching]);

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
                      <TourCard tour={tour} />
                    </Col>
                  );
                }
              )}
          {!isLoading && FilteredTours.length < 1 && isFiltered && (
            <div className={classes.dav__no_results_wrapper}>
              <Paper
                className={classes.dav__no_results_found_error_wrapper_inner}
              >
                No Tours matching your search queries found!
              </Paper>
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Tours;
