import React, { useState } from "react";
import { Button, Fab, List, Paper, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Col, Row } from "react-bootstrap";
import styles from "./NewTour.module.css";
import classes from "./NewItinary.module.css";
import Itinary from "./Itinary";

const PostBlock = (props) => {
  const {
    values,
    setValues,
    BlockHandler,
    Blocks,
    onEditClick,
    onDeleteClick,
    isEdit,
  } = props;
  const [show, setShow] = useState(isEdit ? false : true);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <div className={classes.dav__new_itinary_wrapper}>
      <div className={classes.dav_itinary_title_wrapper}>
        <h5>
          Post Blocks
          {Blocks && Blocks.length > 0 ? `(${Blocks && Blocks.length})` : ""}
        </h5>

        {isEdit && !show && (
          <Fab
            size="small"
            // disabled={isLoading}
            color="primary"
            className={classes.dav__add_new_tour_icon}
            onClick={() => setShow(true)}
          >
            <AddIcon />
          </Fab>
        )}
      </div>

      <Row>
        {isEdit && Blocks && Blocks.length < 1 ? (
          <div style={{ padding: "30px" }}>
            <Paper className={classes.no_block_wrapper}>
              <strong>No blocks added yet for this post</strong>
            </Paper>
          </div>
        ) : (
          Blocks &&
          Blocks.map((block, index) => {
            return (
              <Col
                lg={6}
                md={6}
                sm={6}
                xs={12}
                className={classes.gpa__university_card_wrapper}
                key={block.title}
              >
                <List className={classes.gpa__dashboard_menu_list_item} dense>
                  <Itinary
                    day={index + 1}
                    title={block.title}
                    description={block.description}
                    id={index}
                    onEditClick={onEditClick}
                    onDeleteClick={onDeleteClick}
                  />
                </List>
              </Col>
            );
          })
        )}
      </Row>

      {show && (
        <>
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
        </>
      )}
    </div>
  );
};

export default PostBlock;
