import React, { useState } from "react";
import { toast } from "react-toastify";

//===MUI IMPORTS===
import { Box, Button, Modal } from "@material-ui/core";
//===COMPONENTS IMPORTS===
import classes from "./ModalComponent.module.css";

import { DAV_APIS } from "../../../../Adapter";

const DeleteModal = (props) => {
  const { open, setOpen, Id, setSearchTerm, source } = props;
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    bgcolor: "background.paper",
  };

  const deleteHandler = async () => {
    setLoading(true);
    if (source === "category") {
      await DAV_APIS.deleteCategoryById(Id);

      toast.success("Category deleted Successfully");
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
              ? "tour"
              : source === "category"
              ? "Category"
              : "post"}
          </h1>
          <div className={classes.delete_itinary_model_content}>
            Are you sure you wish to delete this{" "}
            {source === "tour"
              ? "tour"
              : source === "category"
              ? "Category"
              : "post"}
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
