import React from 'react';
import { Form } from 'react-bootstrap';
import { Button } from "../../../UI/Button/Button";
import { Checkbox, FormControlLabel, Paper, TextField } from '@material-ui/core';
import classes from "./BookingForm.module.css"

const BookingForm = props => {
    return (
        <Paper className={classes.dav__book_tour_form_wrapper}>
            <div className={classes.dav__book_tour_title}>
              <h2>Book this Tour</h2>
            </div>
            <Form>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                placeholder="Full Names"
                className={classes.dav__booking_form_field}
              />
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                type="email"
                required
                placeholder="Email"
                className={classes.dav__booking_form_field}
              />
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                type="number"
                placeholder="Phone Number"
                className={classes.dav__booking_form_field_last}
              />
              <div className={classes.dav__book_tour_travel_plans}>
                Travel Plans *
              </div>
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                multiline
                minRows={4}
                placeholder="E.g Number of traveller, duration,travel dates,overall budget, level of acomodation, etc"
                className={classes.dav__booking_form_field}
              />
              <FormControlLabel
                fullWidth
                control={<Checkbox defaultChecked color="primary" />}
                label="Easily monitor booking status"
                className={classes.dav__book_tour_account_creation_prompt}
              />

              <Button
                className="btns"
                type="submit"
                buttonStyle="btn--primary"
                buttonSize="Btn--fullWidth"
              >
                Book Tour
              </Button>
            </Form>
          </Paper>
    )
}

export default BookingForm
