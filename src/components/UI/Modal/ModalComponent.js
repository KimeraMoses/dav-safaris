import React, { useEffect } from "react";

//===MUI IMPORTS===
import {
  Box,
  Modal,
  Button,
  IconButton
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import PhoneIcon from "@material-ui/icons/Phone";

//===COMPONENTS IMPORTS===
import Spinner from "@material-ui/core/CircularProgress";
import LoginButton from "../../Membership/LoginButton/LoginButton";
import classes from "./ModalComponent.module.css";
import { useSelector } from "react-redux";

export const ACTIONTYPE ={
  NON_MEMBER: "NonMember",
  NOT_ENROLLED: "NotEnrolled",
  COURSE_INTRUDER: "CourseIntruder"
}


const ModalComponent = (props) => {
  const { open, setOpen, message, type, action } = props;
  const isLoading = useSelector((state) => state.enrollUser.isLoading);

  const handleClose = () => setOpen(false);
  const style = {
    bgcolor: "background.paper",
  };
  
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className={classes.gpa__modal_wrapper}>
          <div className={classes.gpa__modal_close_button_wrapper}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <Alert severity="error">{message}</Alert>

          <div className={classes.gpa__modal_action_wrapper}>
            {type === ACTIONTYPE.NON_MEMBER ? (
              <LoginButton />
            ) : type === ACTIONTYPE.NOT_ENROLLED ? (
              <Button
                variant="contained"
                color="primary"
                onClick={action}
                disabled={isLoading}
              >
                {isLoading ? "Enrolling..." : "Enroll Now"}
                {isLoading ? (
                  <Spinner thickness={2} size={20} style={{ marginLeft: 5 }} />
                ) : null}
              </Button>
            ) : type === ACTIONTYPE.COURSE_INTRUDER ? (
              <a href="tel:+256759130054" className={classes.gpa__call_help_center_modal_btn}>
              <Button
                variant="contained"
                color="primary"
                endIcon={<PhoneIcon />}
                onClick={handleClose}
              >
                Call Now
              </Button>
              </a>
            ) : (
              ""
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalComponent;
