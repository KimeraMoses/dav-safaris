import React, { useState } from "react";

import { EditorState, convertToRaw } from "draft-js";
import { convertToHTML } from "draft-convert";
import { toast } from "react-toastify";
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

import Spinner from "@material-ui/core/CircularProgress";
import { Alert } from "@material-ui/lab";

//===BOOTSTRAP IMPORTS===
import { Col, Container, Row, Form } from "react-bootstrap";

//===REDUX IMPORTS===

//===COMPONENT IMPORTS===
import styles from "./NewTour.module.css";

import ImageUpload from "./ImageUpload";
import { useEffect } from "react";

import NewKeyWord from "../DashBoard/ManageTours/Keywords/NewKeyWord";

import { ConfigurationEditor } from "../CustomEditor/SMTPEditor.component";

import { DAV_APIS } from "../../Adapter";
import { useAllCountries } from "../../hooks";
const NewTourCategory = (props) => {
  const { setAddNew, onSubmit } = props;
  const { countries } = useAllCountries();
  const DarkMode = false;
  const [isLoading, setIsLoading] = useState(false);

  const [keys, setKeys] = useState([]);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const [values, setValues] = useState({
    name: "",
    description: "",
    country: "",

    cover_image: "",
    selectedImage: "",
  });
  useEffect(() => {}, [values]);

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
      window.scrollTo(0, 0);
      return setError("Tour category title is required");
    }

    if (values.country.length < 1) {
      window.scrollTo(0, 0);
      return setError("Country is required");
    }

    if (values.selectedImage.length < 1) {
      window.scrollTo(0, 0);
      return setError("Tour category cover image required");
    }
    if (values.description.length < 1) {
      window.scrollTo(0, 0);
      return setError("Tour Category Description required");
    }
    setIsLoading(true);
    try {
      const data = {
        name: values.name,
        description: values.description,
        country: values.country,

        selectedImage: values.selectedImage,
      };
      await DAV_APIS.createCategory(data);

      toast.success(`${values.name} Created Successfully`);
      setMessage(`${values.name} Created Successfully`);
      setAddNew(false);
      onSubmit(Math.random());
      setValues({
        name: "",
        description: "",
        country: "",

        cover_image: "",
        selectedImage: "",
      });

      setKeys([]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Tour Category Registration Failed!");
      setError("Tour Category Registration Failed");
    }
  };

  return (
    <Container fluid>
      <section className={styles.gpa__registration_section}>
        <h1
          className={`${styles.gpa__membership_section_title} ${
            DarkMode ? styles.gpa__dark_mode : ""
          }`}
        >
          Create New Tour Category
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
                label="Tour Category Title"
                variant="filled"
                value={values.name}
                name="name"
                size="small"
                onChange={onChangeHandler}
                className={styles.gpa__form_input_field}
              />
              <ConfigurationEditor
                placeholder="Type tour category description here..."
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
                    convertToRaw(state.getCurrentContent()).blocks.length ===
                      1 &&
                    convertToRaw(state.getCurrentContent()).blocks[0].text ===
                      ""
                  ) {
                    setValues({ ...values, description: "" });
                  } else {
                    setValues({ ...values, description: currentContentAsHTML });
                  }
                }}
              />

              <div className="row">
                <div className="col-xs-12 col-sm-8">
                  <FormControl
                    variant="filled"
                    fullWidth
                    className={`${styles.gpa__form_input_field}`}
                  >
                    <InputLabel>Country</InputLabel>
                    <Select
                      value={values.country}
                      name="country"
                      onChange={onChangeHandler}
                    >
                      {countries.map((country) => {
                        return (
                          <MenuItem key={country?.id} value={country?.id}>
                            {country?.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>

                <div
                  className={`col-xs-12 col-sm-4 ${styles.gpa__register_form_right_wrapper}`}
                >
                  <ImageUpload
                    tourImage={values.cover_image}
                    // Image={Tour.imageCover}
                    uploaded={true}
                    tourImageHandler={tourImageHandler}
                  />
                </div>
              </div>

              <NewKeyWord setKeys={setKeys} keys={keys} key_words={[]} />

              <Row>
                <Col xs={{ span: 8, offset: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isLoading}
                    className={styles.gpa__register_submit_button}
                  >
                    {isLoading
                      ? "Creating Tour Category..."
                      : "Create Tour Category"}
                    {isLoading ? (
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

export default NewTourCategory;
