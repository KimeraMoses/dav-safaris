import { Button, Slide } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./PrivacyPrompt.module.css";

const PrivacyPrompt = () => {
  let Read = !!localStorage.getItem("Pp");
  const [show, setShow] = useState(!Read);
  const handlePrivaryPrompt = () => {
    localStorage.setItem("Pp", true);
    setShow(false);
  };
  return (
    <Slide direction="up" in={show} mountOnEnter unmountOnExit>
      <div
        className={`${classes.privacy_prompt} ${
          !show ? classes.privacy_prompt_seen : ""
        }`}
      >
        <div className={classes.prompt_content}>
          <p>
            We use cookies to provide necessary website functionality, improve
            your experience and analyze our traffic. By using our website, you
            agree to our <Link to="/privacy-policies"> privacy policy</Link>
          </p>
        </div>
        <div className={classes.prompt_action}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handlePrivaryPrompt}
          >
            OK
          </Button>
        </div>
      </div>
    </Slide>
  );
};

export default PrivacyPrompt;
