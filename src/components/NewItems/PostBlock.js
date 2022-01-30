import {
  Button,
  Fab,
  FormControl,
  InputLabel,
  List,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import styles from "./NewTour.module.css";
import classes from "./NewItinary.module.css";
import Itinary from "./Itinary";
import { useSelector } from "react-redux";

const PostBlock = (props) => {
  const {
    values,
    setValues,
    BlockHandler,
    Blocks,
    onEditClick,
    isEdit,
  } = props;

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <div className={classes.dav__new_itinary_wrapper}>
      <h5>
        Post Blocks
        {Blocks && Blocks.length > 0
          ? `(${Blocks && Blocks.length})`
          : ""}
      </h5>

      <Row>
        {Blocks &&
          Blocks.map((day, index) => {
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
                  />
                </List>
              </Col>
            );
          })}
      </Row>

      <TextField
        fullWidth
        label="Block Title"
        name="blockTitle"
        value={values.blockTitle}
        onChange={onChangeHandler}
        size="small"
        variant="filled"
        className={styles.gpa__form_input_field}
      />

      <div className={`row ${classes.dav__itinary_submit_button_wrapper}`}>
        <div className="col-xs-10 col-sm-10">
          <TextField
            fullWidth
            label="Block Description"
            multiline
            size="small"
            rows={4}
            variant="filled"
            name="blockDesc"
            value={values.blockDesc}
            onChange={onChangeHandler}
            className={styles.gpa__form_input_field}
          />
        </div>

        <div className="col-xs-2 col-sm-2">
          <Button
            //   disabled={isLoading || isEdditing}
            variant="contained"
            color="primary"
            size="small"
            onClick={BlockHandler}
          >
            Add New Block
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostBlock;
