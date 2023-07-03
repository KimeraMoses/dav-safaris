import React, { useState } from "react";
import { toast } from "react-toastify";

//===MUI IMPORTS===
import { Box, Button, Modal } from "@material-ui/core";
//===COMPONENTS IMPORTS===
import { DAV_APIS } from "../../../../Adapter";
import classes from "./ModalComponent.module.css";

const DeleteModal = (props) => {
  const { open, setOpen, Id, setSearchTerm, source, language } = props;
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    bgcolor: "background.paper",
  };

  const deleteHandler = async () => {
    setLoading(true);
    if (source === "tour") {
      await DAV_APIS.deleteTourById(Id);
      toast.success("Tour deleted Successfully");
    } else {
      await DAV_APIS.deletePostById(Id, language ? "language" : "");
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
