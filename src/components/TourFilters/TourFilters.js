import React from "react";

//===REDUX IMPORTS===
import { useSelector } from "react-redux";

//===MUI IMPORTS===
import {
  FormControl,
  InputLabel,
  TextField,
  MenuItem,
  Select,
} from "@material-ui/core";

//===REACT BOOTSTRAP IMPORTS===
import { Col } from "react-bootstrap";

//===COMPONETS IMPORTS===
import classes from "./TourFilters.module.css";
import {
  TourCategories_Kenya,
  TourCategories_Rwanda,
  TourCategories_Tanzania,
  TourCategories_Uganda,
} from "../NewItems/TourCategories";

const SearchFilter = (props) => {
  const { userSearchHandler, searchTerm, isLoading } = props;
  return (
    <TextField
      label="Search tours..."
      type="search"
      name="search"
      variant="filled"
      disabled={isLoading}
      size="small"
      autoComplete="off"
      value={searchTerm}
      className={`${classes.dav__tour_filter_input_filter} ${classes.dav__search_filter_input_field}`}
      fullWidth
      onChange={userSearchHandler}
    />
  );
};

const CategoryFilter = (props) => {
  const { selectedCategory, categoryChangeHandler, isLoading } = props;
  return (
    <FormControl
      variant="filled"
      fullWidth
      disabled={isLoading}
      className={`${classes.dav__tour_filter_input_filter} ${classes.dav__category_filter_input_field}`}
      size="small"
    >
      <InputLabel>Filter by Category</InputLabel>
      <Select
        value={selectedCategory}
        name="selectedCategory"
        onChange={categoryChangeHandler}
      >
        {TourCategories_Uganda.concat(
          TourCategories_Kenya,
          TourCategories_Tanzania,
          TourCategories_Rwanda
        ).map((category) => {
          return <MenuItem value={category.value}>{category.name}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};

const TourDurationFilter = (props) => {
  const { durationChangeHandler, duration, isLoading } = props;

  return (
    <FormControl
      variant="filled"
      size="small"
      fullWidth
      disabled={isLoading}
      className={`${classes.dav__tour_filter_input_filter} ${classes.dav__duration_filter_input_field}`}
    >
      <InputLabel>Filter by Duration</InputLabel>
      <Select
        value={duration}
        name="duration"
        onChange={durationChangeHandler}
      >
        {Array.from(Array(27).keys()).map((num, index) => {
          return (
            <MenuItem key={index} value={num + 1}>
              {num + 1}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

const CountryFilter = (props) => {
  const { selectedCountry, CountryChangeHandler, isLoading } = props;
  return (
    <FormControl
      variant="filled"
      fullWidth
      className={`${classes.dav__tour_filter_input_filter} ${classes.dav__country_filter_input_field}`}
      size="small"
      disabled={isLoading}
    >
      <InputLabel>Filter by Country</InputLabel>
      <Select
        value={selectedCountry}
        name="selectedCountry"
        onChange={CountryChangeHandler}
      >
        <MenuItem value="uganda">Uganda</MenuItem>
        <MenuItem value="kenya">Kenya</MenuItem>
        <MenuItem value="tanzania">Tanzania</MenuItem>
        <MenuItem value="rwanda">Rwanda</MenuItem>
      </Select>
    </FormControl>
  );
};

const TourFilters = (props) => {
  const isLoading = useSelector((state) => state.tours.isLoading);
  const {
    filterChangeHandler,
    userSearchHandler,
    searchTerm,
    duration,
    selectedCategory,
    selectedCountry,
  } = props;
  return (
    <div className={classes.dav__tours_filters}>
      <Col
        md={6}
        sm={6}
        xs={12}
        className={classes.dav__tour_search_filter_wrapper}
      >
        <SearchFilter
          userSearchHandler={userSearchHandler}
          searchTerm={searchTerm}
          isLoading={isLoading}
        />
        <CountryFilter
          selectedCountry={selectedCountry}
          CountryChangeHandler={filterChangeHandler}
          isLoading={isLoading}
        />
      </Col>
      <Col
        md={6}
        sm={6}
        xs={12}
        className={classes.dav__tour_select_filters_wrapper}
      >
        <TourDurationFilter
          durationChangeHandler={filterChangeHandler}
          duration={duration}
          isLoading={isLoading}
        />

        <CategoryFilter
          selectedCategory={selectedCategory}
          categoryChangeHandler={filterChangeHandler}
          isLoading={isLoading}
        />
      </Col>
    </div>
  );
};

export default TourFilters;
