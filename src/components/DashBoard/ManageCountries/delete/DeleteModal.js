import React, { useState } from "react";
import { toast } from "react-toastify";

//===MUI IMPORTS===
import { Box, Button, Modal } from "@material-ui/core";
//===COMPONENTS IMPORTS===
import classes from "./ModalComponent.module.css";
import { useDispatch } from "react-redux";
import {
  DeleteCountry,
  fetchAllCountrys,
} from "../../../../store/Actions/CountryActions";
import { DeletePost } from "../../../../store/Actions/PostActions";

const DeleteModal = (props) => {
  const { open, setOpen, Id, setSearchTerm, source, language } = props;
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
    if (source === "country") {
      await dispatch(DeleteCountry(Id));
      toast.success("Country deleted Successfully");
      dispatch(fetchAllCountrys());
    } else {
      await dispatch(DeletePost(Id, language ? "language" : ""));
      toast.success("Post deleted Successfully");
    }
    setLoading(false);
    setOpen(false);
    setSearchTerm("");
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} className={classes.delete_itinary_model}>
          <h1>
            Delete{" "}
            {source === "tour"
              ? "Tour"
              : source === "country"
              ? "Country"
              : "Post"}
          </h1>
          <div className={classes.delete_itinary_model_content}>
            Are you sure you wish to delete this{" "}
            {source === "tour"
              ? "Tour"
              : source === "country"
              ? "Country"
              : "Post"}
            ? This action will be permanent and can not be undone.
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
