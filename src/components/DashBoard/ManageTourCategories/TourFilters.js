import { Fab, Hidden, TextField } from "@material-ui/core";
import React from "react";
// import Dropdown from "../../UI/Dropdown/Dropdown";
import classes from "./TourFilters.module.css";
import AddIcon from "@material-ui/icons/Add";
import RefreshIcon from "@material-ui/icons/Refresh";
import BackIcon from "@material-ui/icons/Reply";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";

import { setIsLanguage } from "../../../store/Slices/postSlice";

const TourFilters = (props) => {
  const dispatch = useDispatch();
  const {
    addNew,
    setAddNew,

    searchTerm,
    SearchHandler,
    language,
    type,
    onClick,
  } = props;
  const isLoading = useSelector((state) => state.tours.isLoading);
  const isFetchingPosts = useSelector((state) => state.post.isLoading);
  const RefreshHandler = () => {
    onClick(Math.random());
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
            {/* {type !== "posts" ? (
              <div className={classes.dav__country_dropdown_wrapper}>
                <Dropdown selected={Country} setSelected={setCountry} />
              </div>
            ) : null} */}
          </div>
          <div className={classes.dav__tour_filter_item_wrapper}>
            <div className={classes.dav__tour_search_wrapper}>
              <TextField
                label="Search categories..."
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
              disabled={isLoading || isFetchingPosts}
              color="primary"
              className={classes.dav__refresh_icon_wrapper}
              onClick={RefreshHandler}
            >
              <RefreshIcon
                fontSize="small"
                className={`${
                  isFetchingPosts || isLoading
                    ? classes.gpa__refreshing_icon
                    : ""
                }`}
              />
            </Fab>
            {type === "posts" ||
              (type === "language" && (
                <div
                  className={classes.language_post_btn}
                  onClick={() => {
                    dispatch(setIsLanguage(language ? false : true));
                  }}
                >
                  {language ? "Safari Posts" : "Language Posts"}
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TourFilters;
