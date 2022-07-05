import React, { useEffect, useState } from "react";

//===MUI IMPORTS===
import { Box, Button, Modal, TextField } from "@material-ui/core";

//===COMPONENTS IMPORTS===
import classes from "./ModalComponent.module.css";
import styles from "../../../NewItems/NewTour.module.css";

const EditItinaryModal = (props) => {
  const { open, setOpen, type, data, EditedItinary, dayActivityDescription } =
    props;

  const [values, setValues] = useState({
    day: "",
    itinaryTitle: "",
    itinaryDesc: "",
    meal_plan: "",
    accomodation_plan: "",
  });

  useEffect(() => {
    setValues({
      day: data.day,
      itinaryTitle: data.title,
      itinaryDesc: data.description,
      meal_plan: data.meal_plan,
      accomodation_plan: data.accomodation,
    });
  }, [data]);

  const handleClose = () => {
    setOpen(false);
    setValues({
      day: "",
      itinaryTitle: "",
      itinaryDesc: "",
      meal_plan: "",
      accomodation_plan: "",
    });
  };
  const style = {
    bgcolor: "background.paper",
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const ItinaryHandler = () => {
    const itinary = {
      day: values.day,
      title: values.itinaryTitle,
      description: values.itinaryDesc,
      meal_plan: values.meal_plan,
      accomodation: values.accomodation_plan,
    };

    dayActivityDescription[EditedItinary] = itinary;

    setValues({
      ...values,
      day: "",
      itinaryTitle: "",
      itinaryDesc: "",
      meal_plan: "",
      accomodation_plan: "",
    });
    setOpen(false);
  };

  const deleteHandler = () => {
    dayActivityDescription.splice(EditedItinary, 1);
    setOpen(false);
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        {type === "Delete" ? (
          <Box sx={style} className={classes.delete_itinary_model}>
            <h1>Delete Itinary</h1>
            <div className={classes.delete_itinary_model_content}>
              Are you sure you wish to delete this Itinary? This action will be
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
                Delete
              </Button>
            </div>
          </Box>
        ) : (
          <Box sx={style} className={classes.gpa__modal_wrapper}>
            <h1>Edit Itinary</h1>

            <>
              <div className="row">
                <div className="col-xs-2 col-sm-2">
                  <TextField
                    fullWidth
                    label="Day"
                    variant="filled"
                    size="small"
                    name="day"
                    value={values.day}
                    onChange={onChangeHandler}
                    className={styles.gpa__form_input_field}
                  />
                </div>

                <div
                  className={`col-xs-10 col-sm-10 ${styles.gpa__register_form_right_wrapper}`}
                >
                  <TextField
                    fullWidth
                    label="Itinary Title"
                    name="itinaryTitle"
                    value={values.itinaryTitle}
                    onChange={onChangeHandler}
                    size="small"
                    variant="filled"
                    className={styles.gpa__form_input_field}
                  />
                </div>
              </div>

              <TextField
                fullWidth
                label="Itinary Description"
                multiline
                size="small"
                rows={4}
                variant="filled"
                name="itinaryDesc"
                value={values.itinaryDesc}
                onChange={onChangeHandler}
                className={styles.gpa__form_input_field}
              />
              <div
                className={`row ${classes.dav__itinary_submit_button_wrapper}`}
              >
                <div className="col-xs-12 col-sm-6">
                  <TextField
                    fullWidth
                    label="Meal Plan"
                    variant="filled"
                    name="meal_plan"
                    value={values.meal_plan}
                    size="small"
                    onChange={onChangeHandler}
                    className={styles.gpa__form_input_field}
                  />
                </div>
                <div className="col-xs-12 col-sm-6">
                  <TextField
                    fullWidth
                    label="Accomodation Plan"
                    name="accomodation_plan"
                    value={values.accomodation_plan}
                    onChange={onChangeHandler}
                    variant="filled"
                    size="small"
                    className={styles.gpa__form_input_field}
                  />
                </div>
                {/* <div className="col-xs-2 col-sm-2">
                  <Button
                    //   disabled={isLoading || isEdditing}
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={ItinaryHandler}
                  >
                    Save
                  </Button>
                </div> */}
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
                  onClick={ItinaryHandler}
                >
                  Save
                </Button>
              </div>
            </>
          </Box>
        )}
      </Modal>
    </div>
  );
};

export default EditItinaryModal;
