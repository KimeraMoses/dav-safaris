import React from "react";
import { Box, IconButton, Paper, Zoom } from "@material-ui/core";
import classes from "./ChatCard.module.css";
import { ExpandMore } from "@material-ui/icons";
import ReviewForm from "../../Tours/SingleTour/Reviews/ReviewForm/ReviewForm";
import ChatForm from "./ChatForm";

const Chart = (props) => {
  const { setShow } = props;
  return (
    <Zoom in={true}>
      <Box sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 32 }}>
        <Paper className={classes.dav__chat_wrapper} elevation={2}>
          <div className={classes.dav__chat_header}>
            <h5>Talk to us</h5>
            <p>Leave us a message and our team will get back to you asap!</p>
            <div className={classes.dav__chat_close_icon}>
              <IconButton onClick={() => setShow(false)} size="large">
                <ExpandMore />
              </IconButton>
            </div>
          </div>
          <div className={classes.dav__chat_form_wrapper}>
            <ChatForm />
          </div>
        </Paper>
      </Box>
    </Zoom>
  );
};

export default Chart;
