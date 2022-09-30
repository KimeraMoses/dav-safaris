import { Button, Fab, List, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./NewTour.module.css";
import classes from "./NewItinary.module.css";
import Itinary from "./Itinary";
import AddIcon from "@material-ui/icons/Add";
import { ConfigurationEditor } from "../CustomEditor/SMTPEditor.component";
import { EditorState, convertToRaw } from "draft-js";
import { convertToHTML } from "draft-convert";

const NewItinary = (props) => {
  const {
    values,
    setValues,
    ItinaryHandler,
    dayActivity,
    days,
    onEditClick,
    onDeleteClick,
    isEdit,
  } = props;
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [show, setShow] = useState(isEdit ? false : true);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <div className={classes.dav__new_itinary_wrapper}>
      <div className={classes.dav_itinary_title_wrapper}>
        <h5>
          Itinaries
          {dayActivity && dayActivity.length > 0
            ? `(${dayActivity && dayActivity.length})`
            : ""}
        </h5>

        {isEdit && !show && (
          <Fab
            size="small"
            color="primary"
            className={classes.dav__add_new_tour_icon}
            onClick={() => setShow(true)}
          >
            <AddIcon />
          </Fab>
        )}
      </div>
      <Row>
        {dayActivity &&
          dayActivity.map((day, index) => {
            return (
              <Col
                lg={6}
                md={6}
                sm={6}
                xs={12}
                className={classes.gpa__university_card_wrapper}
                key={day.day}
              >
                <List className={classes.gpa__dashboard_menu_list_item} dense>
                  <Itinary
                    day={day.day}
                    title={day.title}
                    description={day.description}
                    meal_plan={day.meal_plan}
                    accomodation={day.accomodation}
                    id={index}
                    onEditClick={onEditClick}
                    onDeleteClick={onDeleteClick}
                  />
                </List>
              </Col>
            );
          })}
      </Row>
      {show && (
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
          <ConfigurationEditor
            placeholder="Type itinary description here..."
            editorState={editorState}
            onEditorStateChange={(state) => {
              setEditorState(state);
              const currentContentAsHTML = convertToHTML({
                entityToHTML: (entity, originalText) => {
                  if (entity.type === "IMAGE") {
                    return `<img src="${entity.data.src}" />`;
                  }
                  if (entity.type === "LINK") {
                    return ` <a href="${entity.data.url}">${originalText}</a> `;
                  }
                  return originalText;
                },
              })(state.getCurrentContent());
              if (
                convertToRaw(state.getCurrentContent()).blocks.length === 1 &&
                convertToRaw(state.getCurrentContent()).blocks[0].text === ""
              ) {
                setValues({ ...values, itinaryDesc: "" });
              } else {
                setValues({ ...values, itinaryDesc: currentContentAsHTML });
              }
            }}
          />

          <div className={`row ${classes.dav__itinary_submit_button_wrapper}`}>
            <div className="col-xs-12 col-sm-5">
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
            <div className="col-xs-12 col-sm-5">
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
            <div className="col-xs-2 col-sm-2">
              <Button
                disabled={
                  !values?.itinaryTitle || !values?.itinaryDesc || !values?.day
                }
                variant="contained"
                color="primary"
                size="small"
                onClick={ItinaryHandler}
              >
                {dayActivity && dayActivity.length === days - 1
                  ? "Finish"
                  : "Add New Itinary"}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewItinary;
