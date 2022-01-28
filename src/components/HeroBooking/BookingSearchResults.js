import React from "react";
import SearchResults from "../SearchResults/SearchResults";
import classes from "./BookingSearchResults.module.css";

const BookingSearchResults = (props) => {
  const { searchQ, searchResults } = props;
  const DDate = new Date(searchQ.departure);
  const options = {
    day: "numeric",
    month: "long", 
    year: "numeric",
  };
  const DepartureDate = DDate.toLocaleDateString("en-US", options);
  return (
    <div className={classes.dav__search_results_home}>
      <h4 className={classes.dav__search_results_home_title}>
        Search Results for {searchQ.duration} days Tours in{" "}
        {searchQ.destination} starting on{" "}
        {DepartureDate}
      </h4>
      <SearchResults Results={searchResults} />
    </div>
  );
};

export default BookingSearchResults;
