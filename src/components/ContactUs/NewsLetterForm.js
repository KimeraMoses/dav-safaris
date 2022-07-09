import React, { useState } from "react";
import SendIcon from "@material-ui/icons/Telegram";
import classes from "./NewsLetterForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { NewsLetters } from "../../store/Actions/UserActions";
import { Alert } from "@material-ui/lab";
import { toast } from "react-toastify";

const NewsLetterForm = () => {
  const isLoading = useSelector((state) => state.message.subcribing);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    setError("");
  };

  const NewsLetterFormSubmit = async (e) => {
    e.preventDefault();
    if (email.length < 1) {
      return setError("Email required");
    }
    if (email !== "undefined") {
      setError("");
      let pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(email)) {
        setError("Please enter valid email address.");
      }
    }

    try {
      await dispatch(NewsLetters(email));
      toast.success(
        "You have successfully subscribed to Dav Safaris newsletter"
      );
      setEmail("");
    } catch {
      toast.error("Failed to subscribe to Dav Safaris newsletter");
      return setError("Failed to subscribe to the newsletter");
    }
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <div className={classes.dav__new_form_wrapper}>
        <div className={classes.dav__new_form_text_wrapper}>
          <SendIcon fontSize="large" />
          <h5>Subscribe to our Newsletter</h5>
        </div>
        <div className={classes.dav__newsletter_form_wrapper}>
          <form
            className={classes.dav__news_letter_form}
            onSubmit={NewsLetterFormSubmit}
          >
            <input
              className={classes.dav__news_letter_form_input}
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email address"
            />
            <button className={classes.dav__news_letter_form_btn} type="submit">
              {isLoading ? "Subscribing..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewsLetterForm;
