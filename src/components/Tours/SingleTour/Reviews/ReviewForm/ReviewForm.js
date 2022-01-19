import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchAllCountries } from "../../../../../store/Actions/TourActions";
import CustomTextField from "../../../../CountryInputField/CustomTextField";
import HoverRating from "../../../../Rating/Rating";
import { Button } from "../../../../UI/Button/Button";
import classes from "./ReviewForm.module.css";

const ReviewForm = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [country, setCountry] = useState({
    name: "",
    flag: "",
  });
  // const [country,setCountry] = useState("")
  const [show, setShow] = useState(false);
  const countryList = useSelector((state) => state.countries.countryList);
  console.log("Dav Countries", countryList);
  const keyWordHandler = (e) => {
    setShow(false);
    const { value } = e.target;
    setSearchTerm(value);
    // setError("");
    // setMessage("");

    if (searchTerm !== "") {
      const Results = countryList.filter((Result) => {
        return Object.values(Result)
          .join(" ")
          .replace(/-/g, " ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(Results);
    }
  };

  const countryNameHandler = (result) => {
    setCountry({ name: result.name, flag: result.flags.png });
    // setCountry(result.name);
    setSearchTerm("");
    setShow(true);
    // setCourseUnitCode(result.code);
  };

  useEffect(() => {
    dispatch(fetchAllCountries());
  }, []);
  return (
    <Paper className={classes.dav__rate_tour_form_wrapper}>
      <div className={classes.dav__review_form}>
        <h5>Rate this tour</h5>
        <Form>
          <TextField
            variant="outlined"
            size="small"
            variant="filled"
            fullWidth
            label="Your name(s)"
            className={classes.dav__booking_form_field}
          />

          <CustomTextField
            country={country}
            searchTerm={searchTerm}
            show={show}
            countryNameHandler={countryNameHandler}
            keyWordHandler={keyWordHandler}
            searchResults={searchResults}
          />
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            type="email"
            required
            variant="filled"
            label="Email"
            className={classes.dav__booking_form_field}
          />
          <div className="row mb-3">
            <span className={classes.dav__form_titles_inner}>
              When did you go?
            </span>
            <div className="col-xs-6 col-sm-6">
              <FormControl
                variant="filled"
                fullWidth
                size="small"
                className={classes.gpa__form_input_field}
              >
                <InputLabel>Month</InputLabel>
                <Select
                  // value={values.category}
                  // onChange={onChangeHandler}
                  name="category"
                >
                  <MenuItem value="January">January</MenuItem>
                  <MenuItem value="Febuary">Febuary</MenuItem>
                  <MenuItem value="March">March</MenuItem>
                  <MenuItem value="April">April</MenuItem>
                  <MenuItem value="May">May</MenuItem>
                  <MenuItem value="June">June</MenuItem>
                  <MenuItem value="July">July</MenuItem>
                  <MenuItem value="August">August</MenuItem>
                  <MenuItem value="September">September</MenuItem>
                  <MenuItem value="October">October</MenuItem>
                  <MenuItem value="November">November</MenuItem>
                  <MenuItem value="December">December</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-xs-6 col-sm-6">
              <FormControl
                variant="filled"
                fullWidth
                size="small"
                className={classes.gpa__form_input_field}
              >
                <InputLabel>Year</InputLabel>
                <Select
                  // value={values.category}
                  // onChange={onChangeHandler}
                  name="category"
                >
                  <MenuItem value="2022">2022</MenuItem>
                  <MenuItem value="2021">2021</MenuItem>
                  <MenuItem value="2020">2020</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            multiline
            minRows={4}
            placeholder="Share your experience with this tour"
            className={classes.dav__booking_form_field}
          />
          <div className={classes.dav__user_rating_wrapper}>
          <span className={classes.dav__form_titles_inner}>
            How Would You Rate This Tour?
          </span>

          <HoverRating />
          </div>
          <Button
            className="btns"
            type="submit"
            buttonStyle="btn--primary"
            buttonSize="Btn--fullWidth"
          >
            Rate Tour
          </Button>
        </Form>
      </div>
    </Paper>
  );
};

export default ReviewForm;
