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
import {
  DeletePost,
  fetchAllPosts,
} from "../../../../store/Actions/PostActions";

const DeleteModal = (props) => {
  const { open, setOpen, Id, setSearchTerm, source } = props;
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
    if (source === "tour") {
      await dispatch(DeleteTour(Id));
      toast.success("Tour deleted Successfully");
      dispatch(fetchAllTours());
    } else {
      await dispatch(DeletePost(Id));
      toast.success("Post deleted Successfully");
      dispatch(fetchAllPosts());
    }
    setLoading(false);
    setOpen(false);
    setSearchTerm("");
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className={classes.delete_itinary_model}>
          <h1>Delete {source === "tour" ? "Tour" : "Post"}</h1>
          <div className={classes.delete_itinary_model_content}>
            Are you sure you wish to delete this{" "}
            {source === "tour" ? "tour" : "post"}? This action will be permanent
            and can not be undone.
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

export default DeleteModal;
