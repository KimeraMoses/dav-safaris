import React from "react";

//===MUI IMPORTS===
import { Box, Modal } from "@material-ui/core";

//===COMPONENTS IMPORTS===
import classes from "./ModalComponent.module.css";

export const ACTIONTYPE = {
  NON_MEMBER: "NonMember",
  NOT_ENROLLED: "NotEnrolled",
  COURSE_INTRUDER: "CourseIntruder",
};

const ModalComponent = (props) => {
  const { open, setOpen } = props;

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
