import { FormControl, MenuItem, Select, TextField } from "@material-ui/core";
import React from "react";
import { Button } from "../UI/Button/Button";
import classes from "./HeroBooking.module.css";

const HeroBooking = () => {
  return (
    <div className={classes.herobooking__wrapper}>
      <form className={classes.herobooking__form}>
        <div className={classes.herobooking__input_wrapper}>
          <div className={classes.hero__booking__title}>DESTINATION</div>
          <TextField
            required
            type="search"
            variant="filled"
            fullWidth
            size="small"
            placeholder="Bwindi national park"
          />
        </div>
        <div className={classes.herobooking__input_wrapper}>
          <div className={classes.hero__booking__title}>CHECK IN</div>
          <TextField type="date" variant="filled" fullWidth size="small" />
        </div>
        <div className={classes.herobooking__input_wrapper}>
          <div className={classes.hero__booking__title}>CHECK OUT</div>
          <TextField type="date" variant="filled" fullWidth size="small" />
        </div>

        <div className={classes.herobooking__input_wrapper}>
          <div className={classes.hero__booking__title}>
            BUDGET (per person)
          </div>
          <FormControl
            variant="filled"
            fullWidth
            size="small"
            className={classes.hero__booking__budget_input_wrapper}
          >
            <Select name="budget" variant="filled" fullWidth>
              <MenuItem value="1000">Bellow USD 1000</MenuItem>
              <MenuItem value="2000">USD 1000 to 2000</MenuItem>
              <MenuItem value="3000">USD 2000 to 3000</MenuItem>
              <MenuItem value="3001">Above USD 3000</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.hero__booking__submit_btn_wrapper}>
          <Button
            className="btns"
            type="submit"
            buttonStyle="btn--primary"
            buttonSize="btn--large"
          >
            SEARCH...
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HeroBooking;
