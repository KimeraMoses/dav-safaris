import React, { useState } from "react";
import { toast } from "react-toastify";

//===MUI IMPORTS===
import { Box, Button, Modal } from "@material-ui/core";
//===COMPONENTS IMPORTS===
import classes from "./ModalComponent.module.css";
import { useDispatch } from "react-redux";
import {
  DeleteTour,
  fetchAllTours,
} from "../../../../store/Actions/TourActions";

const DeleteTourModal = (props) => {
  const { open, setOpen, tourId, setSearchTerm } = props;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    bgcolor: "background.paper",
  };

  const deleteHandler = async () => {
    setLoading(true);
    await dispatch(DeleteTour(tourId));
    toast.success("Tour deleted Successfully");
    setLoading(false);
    setOpen(false);
    setSearchTerm("");
    dispatch(fetchAllTours());
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className={classes.delete_itinary_model}>
          <h1>Delete Tour</h1>
          <div className={classes.delete_itinary_model_content}>
            Are you sure you wish to delete this Tour? This action will be
            permanent and can not be undone.
          </div>
          <div className={classes.delete_itinary_model_actions}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={deleteHandler}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteTourModal;
