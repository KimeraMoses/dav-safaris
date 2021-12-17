import { Paper, TextField } from "@material-ui/core";
import React from "react";
import { Form } from "react-bootstrap";
import HoverRating from "../../../../Rating/Rating";
import { Button } from "../../../../UI/Button/Button";
import classes from "./ReviewForm.module.css";

const ReviewForm = () => {
  return (
    <Paper className={classes.dav__rate_tour_form_wrapper}>
    <div className={classes.dav__review_form}>
      <h5>Rate this tour</h5>
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
          multiline
          minRows={4}
          placeholder="Share your experience with this tour"
          className={classes.dav__booking_form_field}
        />

        <HoverRating />
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
