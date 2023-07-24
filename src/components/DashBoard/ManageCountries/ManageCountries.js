import React, { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import DashTourCard from "./DashTourCard";
import classes from "./ManageTours.module.css";
import { List } from "@material-ui/core";
import Filters from "./Filters";

import { useEffect } from "react";

import { useNavigate } from "react-router";
import DeleteModal from "./delete/DeleteModal";
import Loader from "../../../containers/Loader/Loader";

import NewCountry from "../../NewItems/NewCountry";

import { useAllCountries } from "../../../hooks";

const ManageTours = () => {
  const [refresh, setRefresh] = useState(null);
  const { countries, isLoading: isFetching } = useAllCountries(refresh);
  const isLoading = isFetching;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [addNew, setAddNew] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchAllCountrys());

    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(countries);
  let FilteredCountries = countries;

  const onEditClick = (countryId) => {
    navigate(`/dashboard/manage-countries/edit?country=${countryId}`);
  };
  const onDeleteClick = (countryId) => {
    setOpen(true);
    setSelectedCountry(countryId);
  };

  const SearchHandler = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    if (searchTerm !== "") {
      const Results = FilteredCountries.filter((Result) => {
        return Object.values(Result)
          .join(" ")
          .replaceAll("-", " ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(Results);
    }
  };

  const isSearching = searchTerm.length < 1 ? true : false;
  useEffect(() => {
    setSearchResults([]);
  }, [isSearching]);

  const RenderedList = (
    searchResults.length > 0 ? searchResults : FilteredCountries
  )?.map((country) => {
    return (
      <Col
        lg={6}
        md={6}
        sm={6}
        xs={12}
        className={classes.gpa__university_card_wrapper}
        key={country.id}
      >
        <List className={classes.gpa__dashboard_menu_list_item}>
          <DashTourCard
            Country={country}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        </List>
      </Col>
    );
  });

  return (
    <Container className={classes.dav__manage_tours_wrapper}>
      <Filters
        addNew={addNew}
        setAddNew={setAddNew}
        searchTerm={searchTerm}
        SearchHandler={SearchHandler}
        onClick={setRefresh}
      />
      {addNew ? (
        <div className={classes.dav__new_tour_form_wrapper}>
          {isLoading ? (
            <Spinner />
          ) : (
            <NewCountry setAddNew={setAddNew} onSubmit={setRefresh} />
          )}
        </div>
      ) : (
        <Row>{isFetching ? <Loader /> : RenderedList}</Row>
      )}
      <DeleteModal
        source="country"
        open={open}
        setOpen={setOpen}
        Id={selectedCountry}
        setSearchTerm={setSearchTerm}
      />
    </Container>
  );
};

export default ManageTours;
