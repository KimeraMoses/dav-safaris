import { Fab, Hidden, TextField } from "@material-ui/core";
import React from "react";
import Dropdown from "../../UI/Dropdown/Dropdown";
import classes from "./TourFilters.module.css";
import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from "@material-ui/icons/Refresh";
import BackIcon from "@material-ui/icons/Reply";
import { useDispatch } from "react-redux";
import { fetchAllTours } from "../../../store/Actions/TourActions";
import { useSelector } from "react-redux";

const TourFilters = (props) => {
  const dispatch = useDispatch();
  const { addNew, setAddNew, Country, setCountry, searchTerm, SearchHandler } =
    props;
  const isLoading = useSelector((state) => state.tours.isLoading);
  const RefreshHandler = () => {
    dispatch(fetchAllTours());
  };

  return (
    <div className={classes.dav__tour_filters_wrapper}>
      {addNew ? (
        <div className={classes.back_btn} onClick={() => setAddNew(false)}>
          <div
            onClick={() => setAddNew(false)}
            className={classes.back_btn_wrapper}
          >
            <BackIcon />
            Back
          </div>
        </div>
      ) : (
        <>
          <div className={classes.dav__tour_filter_item_wrapper}>
            <span className={classes.dav__add_new_tour_icon}>
              <div onClick={() => setAddNew(true)}>
                <AddIcon />
                <Hidden xsDown>Add new</Hidden>
              </div>
            </span>

            <div className={classes.dav__country_dropdown_wrapper}>
              <Dropdown selected={Country} setSelected={setCountry} />
            </div>
          </div>
          <div className={classes.dav__tour_filter_item_wrapper}>
            <div className={classes.dav__tour_search_wrapper}>
              <TextField
                label="Search tours..."
                type="search"
                name="search"
                autoComplete="off"
                value={searchTerm}
                className={classes.gpa__dashboard_search_field}
                fullWidth
                variant="filled"
                size="small"
                onChange={SearchHandler}
              />
            </div>
            <Fab
              size="small"
              disabled={isLoading}
              color="primary"
              className={classes.dav__refresh_icon_wrapper}
              onClick={RefreshHandler}
            >
              <RefreshIcon
                fontSize="small"
                className={`${isLoading ? classes.gpa__refreshing_icon : ""}`}
              />
            </Fab>
          </div>
        </>
      )}
    </div>
  );
};

export default TourFilters;
