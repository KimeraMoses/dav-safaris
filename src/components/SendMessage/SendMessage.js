import React from "react";

//===MUI IMPORTS===
import Zoom from "@material-ui/core/Zoom";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";

//===COMPONENT IMPORTS===
import classes from "./SendMessage.module.css";
import { MessageRounded } from "@material-ui/icons";

const ChatNow = (props) => {
  const { children, setShow } = props;

  return (
    <Zoom in={true}>
      <Box
        onClick={() => setShow(true)}
        role="Chart Now"
        sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 30 }}
      >
        {children}
      </Box>
    </Zoom>
  );
};

const SendMessage = (props) => {
  return (
    <ChatNow {...props}>
      <Fab className={classes.dav__message_count_wrapper}>
        <span className={classes.dav__message_count}>1</span>
        <MessageRounded className={classes.dav__back_to_top_icon} />
      </Fab>
    </ChatNow>
  );
};
export default SendMessage;
