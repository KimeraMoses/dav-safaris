import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "../../../UI/Button/Button";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
import classes from "./BookingForm.module.css";
import CustomTextField from "../../../CountryInputField/CustomTextField";
import { useDispatch, useSelector } from "react-redux";
import { BookTour } from "../../../../store/Actions/TourActions";
import { Alert } from "@material-ui/lab";

const BookingForm = (props) => {
  const countryList = useSelector((state) => state.countries.countryList);
  const isLoading = useSelector((state) => state.tour.isBooking);
  const Tour = useSelector((state) => state.tour.tourDetails);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [country, setCountry] = useState({
    name: "",
    flag: "",
  });
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    user_name: "",
    country_of_residence: "",
    phone: "",
    email: "",
    travel_plans: "",
    budget: "",
    travellers: "",
  });

  const keyWordHandler = (e) => {
    setShow(false);
    const { value } = e.target;
    setSearchTerm(value);

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
    setMessage("");
  };

  const BookingFormSubmitHandler = async (e) => {
    e.preventDefault();

    if (values.user_name.length < 1) {
      return setError("Name(s) required to book tour");
    }
    if (values.email.length < 1) {
      return setError("Email required");
    }
    if (values.phone.length < 1) {
      return setError("Phone number required");
    }
    if (values.phone.length > 14 || values.phone.length < 10) {
      return setError("Please enter a valid phone number");
    }
    if (values.country_of_residence.length < 1) {
      return setError("Please select your country of residence");
    }
    if (values.travellers.length < 1) {
      return setError("Number of travellers required");
    }
    if (values.travel_plans.length < 1) {
      return setError("Please tell us some of your travel plans");
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
      setError("");
      await dispatch(
        BookTour(
          Tour.id,
          values.user_name,
          values.country_of_residence,
          values.phone,
          values.email,
          parseInt(values.travellers),
          values.travel_plans,
          values.budget
        )
      );
      setValues({
        user_name: "",
        country_of_residence: "",
        phone: "",
        email: "",
        travel_plans: "",
        travellers: "",
        budget: "",
      });
      setCountry({
        name: "",
        flag: "",
      });
      setSearchTerm("");
      setMessage(
        "Booking sent successfully, Our travel agent will get back to you shortly"
      );
    } catch (error) {
      return setError("Failed to book tour, try again later");
    }
  };

  return (
    <Paper className={classes.dav__book_tour_form_wrapper}>
      <div className={classes.dav__book_tour_title}>
        <h2>Book this Tour</h2>
      </div>
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

      <Form onSubmit={BookingFormSubmitHandler}>
        <TextField
          variant="filled"
          size="small"
          fullWidth
          onChange={handleOnChange}
          value={values.user_name}
          name="user_name"
          label="Full Names"
          className={classes.dav__booking_form_field}
        />
        <TextField
          variant="filled"
          size="small"
          fullWidth
          type="email"
          name="email"
          onChange={handleOnChange}
          value={values.email}
          label="email"
          className={classes.dav__booking_form_field}
        />
        <TextField
          variant="filled"
          size="small"
          fullWidth
          type="number"
          value={values.phone}
          onChange={handleOnChange}
          name="phone"
          label="Phone Number"
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
        <FormControl
          variant="filled"
          fullWidth
          className={`${classes.gpa__form_input_field}`}
        >
          <InputLabel>Travel Budget</InputLabel>
          <Select value={values.budget} name="budget" onChange={handleOnChange}>
            <MenuItem value="Budget">Budget</MenuItem>
            <MenuItem value="mid-range">Mid Range</MenuItem>
            <MenuItem value="luxury">Luxury</MenuItem>
          </Select>
        </FormControl>
        <TextField
          variant="filled"
          size="small"
          fullWidth
          type="number"
          value={values.travellers}
          onChange={handleOnChange}
          name="travellers"
          label="Number of travellers"
          className={classes.dav__booking_form_field__last}
        />
        <div className={classes.dav__book_tour_travel_plans}>
          Travel Plans *
        </div>
        <TextField
          variant="outlined"
          size="small"
          value={values.travel_plans}
          name="travel_plans"
          onChange={handleOnChange}
          fullWidth
          multiline
          minRows={4}
          placeholder="Tell us about the Number of traveller, duration,travel dates,overall budget, level of acomodation, etc(it's ok to be detailed)"
          className={classes.dav__booking_form_field}
        />
        {/* <FormControlLabel
          fullWidth
          control={<Checkbox defaultChecked color="primary" />}
          label="Easily monitor booking status"
          className={classes.dav__book_tour_account_creation_prompt}
        /> */}

        <Button
          className="btns"
          type="submit"
          buttonStyle="btn--primary"
          buttonSize="Btn--fullWidth"
        >
          {isLoading ? "Booking..." : "Book Tour"}
        </Button>
      </Form>
    </Paper>
  );
};

export default BookingForm;
