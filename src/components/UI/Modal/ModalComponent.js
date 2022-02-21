import React, { useEffect } from "react";

//===MUI IMPORTS===
import { Box, Modal, Button, IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import PhoneIcon from "@material-ui/icons/Phone";

//===COMPONENTS IMPORTS===
import classes from "./ModalComponent.module.css";
import { useSelector } from "react-redux";

export const ACTIONTYPE = {
  NON_MEMBER: "NonMember",
  NOT_ENROLLED: "NotEnrolled",
  COURSE_INTRUDER: "CourseIntruder",
};

const ModalComponent = (props) => {
  const { open, setOpen, message, type, action } = props;

  const handleClose = () => setOpen(false);
  const style = {
    bgcolor: "background.paper",
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className={classes.gpa__modal_wrapper}>
          Modal Open
        </Box>
      </Modal>
    </div>
  );
};

export default ModalComponent;
