import React from "react";

//===MUI IMPORTS===
import { Box, Modal } from "@material-ui/core";

//===COMPONENTS IMPORTS===
import classes from "./ModalComponent.module.css";

const ModalComponent = (props) => {
  const { open, setOpen, data } = props;

  const handleClose = () => setOpen(false);
  const style = {
    bgcolor: "background.paper",
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className={classes.gpa__modal_wrapper}>
          <h2>{data?.name}</h2>
          <p>{data?.description}</p>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalComponent;
