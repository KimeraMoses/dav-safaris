import React from "react";
import SendIcon from "@material-ui/icons/Telegram";
import classes from "./NewsLetterForm.module.css";

const NewsLetterForm = () => {
  return (
    <div className={classes.dav__new_form_wrapper}>
      <div className={classes.dav__new_form_text_wrapper}>
        <SendIcon fontSize="large"/>
        <h5>Subscribe to our Newsletter</h5>
      </div>
      <div className={classes.dav__newsletter_form_wrapper}>
        <form className={classes.dav__news_letter_form}>
          <input
            className={classes.dav__news_letter_form_input}
            type="text"
            placeholder="Enter your email address"
          />
          <button className={classes.dav__news_letter_form_btn} type="submit">
            Sign Up
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default NewsLetterForm;
