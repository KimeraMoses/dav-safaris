import React from "react";
import { Form } from "react-bootstrap";
import { Button } from "../../../UI/Button/Button";
import {
  Checkbox,
  FormControlLabel,
  Paper,
  TextField,
} from "@material-ui/core";
import classes from "./BookingForm.module.css";

const ContactForm = (props) => {
  return (
    <Paper className={classes.dav__book_tour_form_wrapper}>
      <div className={classes.dav__book_tour_title}>
        <h2>Let's Talk</h2>
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
          className={classes.dav__booking_form_field}
        />
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          multiline
          minRows={4}
          placeholder="message"
          className={classes.dav__booking_form_field}
        />

        <Button
          className="btns"
          type="submit"
          buttonStyle="btn--primary"
          buttonSize="Btn--fullWidth"
        >
          Send
        </Button>
      </Form>
    </Paper>
  );
};

export default ContactForm;
