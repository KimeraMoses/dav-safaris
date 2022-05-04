import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Tooltip,
} from "@material-ui/core";
import { Alert, Rating } from "@material-ui/lab";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  fetchAllCountries,
  fetchTourReviews,
  ReviewTour,
} from "../../../../../store/Actions/TourActions";
import CustomTextField from "../../../../CountryInputField/CustomTextField";
import { Button } from "../../../../UI/Button/Button";
import classes from "./ReviewForm.module.css";
import { useParams } from "react-router";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

const ReviewForm = (props) => {
  const { tourTitle } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCountries());
  }, [dispatch]);
  const countryList = useSelector((state) => state.countries.countryList);
  const isLoading = useSelector((state) => state.tour.isReviewing);
  const Tour = useSelector((state) => state.tour.tourDetails);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hover, setHover] = React.useState(-1);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [country, setCountry] = useState({
    name: "",
    flag: "",
  });

  const [show, setShow] = useState(false);
  const [values, setValues] = useState({
    user_name: "",
    country_of_residence: "",
    review: "",
    rating: "",
    visit_month: "",
    visit_year: "",
    email: "",
  });
  useEffect(() => {}, [tourTitle]);

  const keyWordHandler = (e) => {
    setShow(false);
    const { value } = e.target;
    setSearchTerm(value);
    setError("");

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
    setValues({ ...values, country_of_residence: result.name });
    setSearchTerm("");
    setShow(true);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setError("");
  };

  const ReviewFormSubmitHandler = async (e) => {
    e.preventDefault();
    if (values.user_name.length < 1) {
      return setError("Name(s) required to book tour");
    }
    if (values.country_of_residence.length < 1) {
      return setError("Please select your country of residence");
    }
    if (values.email.length < 1) {
      return setError("Email required");
    }
    if (values.visit_month.length < 1) {
      return setError("Please select month, you went to this tour");
    }
    if (values.visit_year.length < 1) {
      return setError("Please select year, you went to this tour");
    }

    if (values.email !== "undefined") {
      setError("");
      let pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(values.email)) {
        setError("Please enter valid email address.");
      }
    }
    try {
      await dispatch(
        ReviewTour(
          Tour.id,
          values.review,
          values.rating,
          values.user_name,
          values.country_of_residence,
          values.visit_month,
          values.visit_year,
          values.email
        )
      );

      setValues({
        user_name: "",
        country_of_residence: "",
        review: "",
        rating: "",
        visit_month: "",
        visit_year: "",
        email: "",
      });
      setCountry({
        name: "",
      });
      setSearchTerm("");
      setMessage("Review successfully sent. Thank you");
      dispatch(fetchTourReviews(Tour.id));
    } catch (error) {
      return setError(
        "Failed to send your review now, please check your connection and try again later"
      );
    }
  };

  return (
    <Paper className={classes.dav__rate_tour_form_wrapper}>
      <div className={classes.dav__review_form}>
        <h5>Rate this tour</h5>
        {error && (
          <div className="d-flex justify-content-center mb-3">
            <Alert severity="error">{error}</Alert>
          </div>
        )}
        {message && (
          <div className="d-flex justify-content-center mb-3">
            <Alert severity="success">{message}</Alert>
          </div>
        )}
        <Form onSubmit={ReviewFormSubmitHandler}>
          <TextField
            inputRef={props.userNameRef}
            size="small"
            variant="filled"
            fullWidth
            value={values.user_name}
            name="user_name"
            onChange={handleOnChange}
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
            size="small"
            fullWidth
            type="email"
            name="email"
            value={values.email}
            onChange={handleOnChange}
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
                className={classes.dav__booking_form_field}
              >
                <InputLabel>Month</InputLabel>
                <Select
                  value={values.visit_month}
                  name="visit_month"
                  onChange={handleOnChange}
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
                className={classes.dav__booking_form_field}
              >
                <InputLabel>Year</InputLabel>
                <Select
                  value={values.visit_year}
                  name="visit_year"
                  onChange={handleOnChange}
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
            value={values.review}
            name="review"
            onChange={handleOnChange}
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
            <Tooltip
              title={labels[hover !== -1 ? hover : values.rating]}
              placement="top"
              arrow
            >
              <Rating
                precision={0.5}
                value={values.rating}
                onChange={(event, newValue) => {
                  setValues({ ...values, rating: newValue });
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
              />
            </Tooltip>
          </div>
          <Button
            className="btns"
            type="submit"
            buttonStyle="btn--primary"
            buttonSize="Btn--fullWidth"
          >
            {isLoading ? "Sending Review..." : "Rate Tour"}
          </Button>
        </Form>
      </div>
    </Paper>
  );
};

export default ReviewForm;
