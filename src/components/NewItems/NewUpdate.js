import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

//===MUI IMPORTS===
import {
  Button,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import Spinner from "@material-ui/core/CircularProgress";
import { Alert } from "@material-ui/lab";

//===BOOTSTRAP IMPORTS===
import { Col, Container, Row, Form } from "react-bootstrap";

//===REDUX IMPORTS===

//===COMPONENT IMPORTS===
import styles from "./NewTour.module.css";
import ImageUpload from "./ImageUpload";
import { useEffect } from "react";
import { creatNewPost } from "../../store/Actions/PostActions";



const NewUpdate = (props) => {
  const isLoading = useSelector((state) => state.post.isLoading);
  const { isEdit, setIsEdit } = props;
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [values, setValues] = useState({
    name: "",
    description: "",
    tourActivities: "",
    cover_image: "",
    selectedImage: "",
  });


  //====FORMATING THE TOUR HIGHLIGHTS====//
  let tourActivities = [];
  {
    values.tourActivities &&
      values.tourActivities.split("\n").map((item, index) => {
        tourActivities.push(item);
      });
  }
 
  //====TOUR COVER IMAGE HANDLER====//
  const tourImageHandler = async (e) => {
    const file = e.target.files[0];
    const Image = await convertbase64Logo(file);
    setValues({ ...values, cover_image: Image, selectedImage: file });
  };

  const convertbase64Logo = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
    setMessage("");
    setError("");
  };


  const RegisterFormSubmitHandler = async (e) => {
    e.preventDefault();
    if (values.name.length < 1) {
      return setError("Tour title is required");
    }

    if (!isEdit && values.selectedImage.length < 1) {
      return setError("Tour cover image required");
    }
    if (values.description.length < 1) {
      return setError("Post Description required");
    }

    try {
      await dispatch(
        creatNewPost(
          values.name,
          values.description,
          JSON.stringify(tourActivities),
          values.selectedImage,
        )
      );
      setMessage(`${values.name} Created Successfully`);
      setValues({
        name: "",
        description: "",
        tourActivities: "",
        cover_image: "",
        selectedImage: "",
      });
  
    } catch (error) {
      setError("Post Creation Failed");
    }
  };

  return (
    <Container fluid>
      <section className={styles.gpa__registration_section}>
        <h1
          className={styles.gpa__membership_section_title}
        >
          Create New Safari Update
        </h1>
        <Paper
          className={`${styles.gpa__register_wrapper} ${styles.gpa__register_wrapper_register_new}`}
        >
          <div className={styles.gpa__register_wrapper_inner}>
            {error && (
              <div className="d-flex justify-content-center mb-3">
                <Alert severity="error">{error}</Alert>
              </div>
            )}
            {message && (
              <div className="d-flex justify-content-center mb-3">
                <Alert severity="success">{message}</Alert>
              </div>
            )}

            <Form onSubmit={RegisterFormSubmitHandler}>
              <TextField
                fullWidth
                label="Post Title"
                variant="filled"
                value={values.name}
                name="name"
                size="small"
                onChange={onChangeHandler}
                className={styles.gpa__form_input_field}
              />
              <TextField
                className={styles.gpa__form_input_field}
                label="Post Description"
                multiline
                value={values.description}
                name="description"
                onChange={onChangeHandler}
                rows={6}
                fullWidth
                variant="filled"
              />
              <div className="row">
                <div className="col-xs-12 col-sm-9">
                  <TextField
                    className={styles.gpa__form_input_field}
                    label="Post Highlights"
                    placeholder="Write each highlight on a new line"
                    multiline
                    value={values.tourActivities}
                    name="tourActivities"
                    onChange={onChangeHandler}
                    rows={4}
                    fullWidth
                    variant="filled"
                  />
                </div>

                <div
                  className={`col-xs-12 col-sm-3 ${styles.gpa__register_form_right_wrapper}`}
                >
                  <ImageUpload
                    isPost={true}
                    tourImage={values.cover_image}
                    Image={values.selectedImage}
                    uploaded={true}
                    tourImageHandler={tourImageHandler}
                  />
                </div>
              </div>

              <Row>
                <Col xs={{ span: 8, offset: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={styles.gpa__register_submit_button}
                  >
                    { isLoading
                      ? "Creating Updates..."
                      : "Post Update"}
                    {isLoading? (
                      <Spinner
                        thickness={2}
                        size={20}
                        style={{ marginLeft: 5 }}
                      />
                    ) : null}
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Paper>
      </section>
    </Container>
  );
};

export default NewUpdate;
