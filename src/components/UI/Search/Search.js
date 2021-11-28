import React, { useState } from "react";
import { Link } from "react-router-dom";

//===REDUX IMPORTS===
import { useSelector } from "react-redux";

//===MUI IMPORTS===
import { Divider } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import classes from "./Search.module.css";

const Search = (props) => {
  const DarkMode = useSelector((state) => state.theme.darkMode);
  const universityList = useSelector(
    (state) => state.universities.universityList
  );
  const courseList = useSelector((state) => state.courses.courseList);
  const courseUnitList = useSelector(
    (state) => state.courseUnits.courseUnitList
  );

  const searchObj = universityList.concat(courseList).concat(courseUnitList);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const keyWordHandler = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    if (searchTerm !== "") {
      const Results = searchObj.filter((Result) => {
        return Object.values(Result)
          .join(" ")
          .replaceAll('-',' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(Results);
    }
  };

  return (
    <>
      <div
        className={`${classes.gpa__home_search_section_search_bar_wrapper} ${
          DarkMode ? classes.gpa__dark_mode : ""
        } gpa__results_dropdown_show`}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="search"
          className={classes.gpa__home_search_bar_icon}
          role="img"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
          ></path>
        </svg>
        <input
          type="text"
          className={classes.gpa__home_search_bar_input_area}
          autoComplete="off"
          placeholder={props.placeholder}
          spellCheck="true"
          value={searchTerm}
          name="search"
          onChange={keyWordHandler}
        />
        {searchTerm.length > 0 && (
          <span className={classes.gpa__search_result_count}>
            {searchResults.length}
          </span>
        )}

        <span className={classes.gpa__home_search_bar_input_area_clear}>
          {searchTerm.length > 0 && (
            <ClearIcon onClick={() => setSearchTerm("")} />
          )}
        </span>
      </div>
      {searchTerm.length > 0 && (
        <div
          className={`${
            classes.gpa__home_search_section_search_results_wrapper
          } ${DarkMode ? classes.gpa__dark_mode : ""}`}
        >
          <ul
            className={`${
              classes.gpa__home_search_section_search_results_dropdown
            } ${DarkMode ? classes.gpa__dark_mode : ""} ${
              searchResults &&
              classes.gpa__home_search_section_search_results_dropdown_show
            } ${
              searchResults.length < 0
                ? classes.gpa__no_search_found_wrapper
                : ""
            }`}
          >
            {searchResults.length > 0 ? (
              searchResults.map((result) => {
                let resultType, resultLink;
                if (result) {
                  resultLink =
                    result && result.links
                      ? `${result.name && result.name}`
                      : result && result.semester
                      ? `${
                          result &&
                          result.courses_attached_to[0].university.name
                        }/${result && result.courses_attached_to[0].name}/${
                          result && result.name
                        }`
                      : `${result.university && result.university.name}/${
                          result && result.name
                        }`;
                  resultType =
                    result && result.links
                      ? `university`
                      : result && result.semester
                      ? `course_unit`
                      : `course`;
                }
                return (
                  <>
                    <Link to={`/${resultLink}`} key={result.id}>
                      <li
                        className={`${
                          classes.gpa__custom_search_result_wrapper
                        } ${DarkMode ? classes.gpa__dark_mode : ""}`}
                      >
                        <div
                          className={classes.gpa__custom_search_result_inner}
                        >
                          <div className={classes.gpa__result_title}>
                            {resultType === "university"
                              ? `${result.name.replaceAll(
                                  "-",
                                  " "
                                )} ~ ${result.code.toUpperCase()}`
                              : resultType === "course_unit"
                              ? `${result.code.toUpperCase()}-${result.name.replaceAll(
                                  "-",
                                  " "
                                )} ~ ${result.courses_attached_to[0].university.name.replaceAll(
                                  "-",
                                  " "
                                )}`
                              : `${result.name.replaceAll(
                                  "-",
                                  " "
                                )} ~ ${result.university && result.university.name.replaceAll(
                                  "-",
                                  " "
                                )}`}
                          </div>
                          <div className={classes.gpa__result_url}>
                            {`https://gpaelevator.com/${resultLink}`}
                          </div>
                        </div>
                      </li>
                    </Link>
                    <Divider variant="middle" />
                  </>
                );
              })
            ) : (
              <div style={{ padding: 8, overflow: "hidden" }}>
                No results found for <strong>{searchTerm}</strong>
              </div>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default Search;
