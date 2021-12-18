import { Button, Checkbox, Fab, FormControlLabel, Paper, TextField } from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';
import React from "react";
import { Form } from "react-bootstrap";
import classes from "./ChatForm.module.css";

const ChatForm = () => {
  return (
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
        required
        placeholder="Phone Number"
        className={classes.dav__booking_form_field}
      />
      <TextField
        variant="outlined"
        size="small"
        fullWidth
        multiline
        minRows={4}
        placeholder="Message"
        className={classes.dav__booking_form_field}
      />
      <div className={classes.dav__chat_send_btn_wrapper}>
        <div className={classes.dav__subscribe_wrapper}>
          <FormControlLabel
            fullWidth
            control={<Checkbox defaultChecked color="primary" />}
            label="Subscribe to our newsletters"
            className={classes.dav__book_tour_account_creation_prompt}
          />
        </div>
        <Fab className={classes.dav__message_count_wrapper} type="submit">
          <SendIcon className={classes.dav__send_icon} />
        </Fab>
      </div>
    </Form>
  );
};

export default ChatForm;
