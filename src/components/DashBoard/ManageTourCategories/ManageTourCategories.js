import React, { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import DashTourCard from "./DashTourCard";
import classes from "./ManageTours.module.css";
import { List } from "@material-ui/core";
import TourFilters from "./TourFilters";
import NewTourCategory from "../../NewItems/NewTourCategory";

import { useEffect } from "react";
import { useNavigate } from "react-router";
import DeleteModal from "./delete/DeleteModal";
import Loader from "../../../containers/Loader/Loader";

import { useAllCategories } from "../../../hooks";

const ManageTourCategories = () => {
  const [refresh, setRefresh] = useState(null);
  const { categories, isLoading: isFetching } = useAllCategories(refresh);
  const isLoading = isFetching;

  const [country, setCountry] = useState("Filter by country");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [addNew, setAddNew] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    

    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let FilteredCategories = categories;

  const onEditClick = (cat_Id) => {
    navigate(`/dashboard/manage-tour-categories/edit?category=${cat_Id}`);
  };
  const onDeleteClick = (cat_Id) => {
    setOpen(true);
    setSelectedCategory(cat_Id);
  };

  const SearchHandler = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    if (searchTerm !== "") {
      const Results = FilteredCategories?.filter((Result) => {
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
    searchResults.length > 0 ? searchResults : FilteredCategories
  )?.map((category) => {
    return (
      <Col
        lg={6}
        md={6}
        sm={6}
        xs={12}
        className={classes.gpa__university_card_wrapper}
        key={category.id}
      >
        <List className={classes.gpa__dashboard_menu_list_item}>
          <DashTourCard
            category={category}
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
        onClick={setRefresh}
      />
      {addNew ? (
        <div className={classes.dav__new_tour_form_wrapper}>
          {isLoading ? (
            <Spinner />
          ) : (
            <NewTourCategory setAddNew={setAddNew} onSubmit={setRefresh} />
          )}
        </div>
      ) : (
        <Row>{isFetching ? <Loader /> : RenderedList}</Row>
      )}
      <DeleteModal
        source="category"
        open={open}
        setOpen={setOpen}
        Id={selectedCategory}
        setSearchTerm={setSearchTerm}
      />
    </Container>
  );
};

export default ManageTourCategories;
