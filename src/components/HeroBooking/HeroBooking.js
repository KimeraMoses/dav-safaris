import React from "react";
import {
  FormControl,
  MenuItem,
  Select,
  TextField,
  InputLabel,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "../UI/Button/Button";
import classes from "./HeroBooking.module.css";
import { useAllCountries } from "../../hooks";

const HeroBooking = (props) => {
  const { values, handleOnChange, TourSearchHandler, error } = props;
  const { countries } = useAllCountries();

  return (
    <div className={classes.herobooking__wrapper}>
      {error && (
        <div className={classes.dav__seaarch_results_error_wrapper}>
          {error}
        </div>
      )}
      <form className={classes.herobooking__form} onSubmit={TourSearchHandler}>
        <div className={classes.herobooking__input_wrapper}>
          <div className={classes.hero__booking__title}>DESTINATION</div>
          <FormControl
            variant="filled"
            size="small"
            fullWidth
            className={`${classes.gpa__form_input_field}`}
          >
            <InputLabel>Destination country</InputLabel>
            <Select
              value={values.destination}
              name="destination"
              onChange={handleOnChange}
            >
              {" "}
              {countries.map((country, index) => (
                <MenuItem key={index} value={country.name.toLowerCase()}>
                  {country.name}
                </MenuItem>
              ))}
              {/* <MenuItem value="uganda">Uganda</MenuItem>
              <MenuItem value="kenya">Kenya</MenuItem>
              <MenuItem value="tanzania">Tanzania</MenuItem>
              <MenuItem value="rwanda">Rwanda</MenuItem> */}
            </Select>
          </FormControl>
        </div>
        <div className={classes.herobooking__input_wrapper}>
          <div className={classes.hero__booking__title}>Travel Duration</div>
          <FormControl
            variant="filled"
            size="small"
            fullWidth
            className={`${classes.gpa__form_input_field}`}
          >
            <InputLabel>Number of days to travel</InputLabel>
            <Select
              value={values.duration}
              name="duration"
              onChange={handleOnChange}
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
        </div>
        <div className={classes.herobooking__input_wrapper}>
          <div className={classes.hero__booking__title}>Departure</div>
          <TextField
            type="date"
            variant="filled"
            fullWidth
            size="small"
            name="departure"
            value={values.departure}
            onChange={handleOnChange}
            className={`${classes.gpa__form_input_field}`}
          />
        </div>
        <div className={classes.hero__booking__submit_btn_wrapper}>
          <Button
            className="btns"
            type="submit"
            buttonStyle="btn--primary"
            buttonSize="btn--large"
          >
            <SearchIcon />
            SEARCH TOUR
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HeroBooking;
