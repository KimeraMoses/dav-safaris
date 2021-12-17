import React from "react";
import classes from "./JumpNavigation.module.css";

const JumpNavigation = () => {
  return (
    <div className={classes.dav__single_tour_jump_to_navigation}>
      <ul className={classes.dav__single_tour_jump_to_links_wrapper}>
        <li>
          <span className={classes.dav__single_tour_jump_label}>Jump to:</span>
        </li>
        <li>
          <a href="#description">Description</a>
        </li>
        <li>
          <a href="#itinerary">Itinerary</a>
        </li>
        <li>
          <a href="#reviews">Reviews</a>
        </li>
      </ul>
    </div>
  );
};

export default JumpNavigation;
