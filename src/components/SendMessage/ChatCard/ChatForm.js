import { Checkbox, Fab, FormControlLabel, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { Alert } from "@material-ui/lab";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Progress from "@material-ui/core/CircularProgress";
import classes from "./ChatForm.module.css";
import { chatWithUs } from "../../../store/Actions/TourActions";

const ChatForm = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    travellers: "",
    is_add_to_news_letter: false,
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setError("");
    setMessage("");
  };
  const NewsLetterHandler = (e) => {
    setValues({ ...values, is_add_to_news_letter: e.target.checked });
  };

  const MessageFormSubmitHandler = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (values.name.length < 1) {
      return setError("Name(s) required");
    }
    if (values.phone.length < 1) {
      return setError("Phone number required");
    }
    if (values.email.length < 1) {
      return setError("Email required");
    }
    if (values.travellers.length < 1) {
      return setError("Number of travellers is required");
    }
    if (values.message.length < 1) {
      return setError("Please message is required");
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
        chatWithUs(
          values.name,
          values.email,
          values.phone,
          values.message,
          parseInt(values.travellers),
          values.is_add_to_news_letter
        )
      );
      setIsLoading(false);
      setMessage(
        "Message Sent Successfully, Our team will contact you shortly"
      );
      setValues({
        name: "",
        email: "",
        phone: "",
        message: "",
        travellers: "",
        is_add_to_news_letter: false,
      });
    } catch (error) {
      setIsLoading(false);
      return setError("Failed to send message, Please try again later");
    }
  };

  return (
    <>
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

      <Form onSubmit={MessageFormSubmitHandler}>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          name="name"
          value={values.name}
          onChange={handleOnChange}
          placeholder="Full Names"
          className={classes.dav__booking_form_field}
        />
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          type="email"
          name="email"
          value={values.email}
          onChange={handleOnChange}
          placeholder="Email"
          className={classes.dav__booking_form_field}
        />
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          type="number"
          name="phone"
          value={values.phone}
          onChange={handleOnChange}
          placeholder="Phone Number"
          className={classes.dav__booking_form_field}
        />
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          type="number"
          name="travellers"
          value={values.travellers}
          onChange={handleOnChange}
          placeholder="Number of travellers"
          className={classes.dav__booking_form_field}
        />
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          multiline
          minRows={4}
          placeholder="Message"
          name="message"
          value={values.message}
          onChange={handleOnChange}
          className={classes.dav__booking_form_field}
        />
        <div className={classes.dav__chat_send_btn_wrapper}>
          <div className={classes.dav__subscribe_wrapper}>
            <FormControlLabel
              fullWidth
              control={
                <Checkbox
                  color="primary"
                  checked={values.is_add_to_news_letter}
                  onChange={NewsLetterHandler}
                />
              }
              label="Subscribe to our newsletters"
              className={classes.dav__book_tour_account_creation_prompt}
            />
          </div>
          <Fab
            className={classes.dav__message_count_wrapper}
            type="submit"
            disabled={isLoading}
            color="primary"
          >
            {isLoading ? (
              <Progress />
            ) : (
              <SendIcon className={classes.dav__send_icon} />
            )}
          </Fab>
        </div>
      </Form>
    </>
  );
};

export default ChatForm;
