import React from "react";
import SearchResults from "../SearchResults/SearchResults";
import classes from "./BookingSearchResults.module.css";

const BookingSearchResults = (props) => {
  const { searchQ, searchResults } = props;
  return (
    <div className={classes.dav__search_results_home}>
      <h4 className={classes.dav__search_results_home_title}>
        Search Results for {searchQ.duration} days Tours in{" "}
        {searchQ.destination} starting on{" "}
        {new Date(searchQ.departure).toLocaleDateString("en-GB")}
      </h4>
      <SearchResults Results={searchResults} />
    </div>
  );
};

export default BookingSearchResults;
