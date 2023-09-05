import React, { useState } from "react";

import { toast } from "react-toastify";
import { convertToRaw } from "draft-js";
import { convertToHTML } from "draft-convert";
//===MUI IMPORTS===
import { Button, Paper, TextField } from "@material-ui/core";
import BackIcon from "@material-ui/icons/Reply";

import Spinner from "@material-ui/core/CircularProgress";
import { Alert } from "@material-ui/lab";

//===BOOTSTRAP IMPORTS===
import { Col, Container, Row, Form } from "react-bootstrap";

//===REDUX IMPORTS===

//===COMPONENT IMPORTS===
import styles from "../../NewItems/NewTour.module.css";
import { useEffect } from "react";

import ImageUpload from "../../NewItems/ImageUpload";

import { useLocation, useNavigate } from "react-router";

import { Link } from "react-router-dom";
import Loader from "../../../containers/Loader/Loader";
import NewKeyWord from "./Keywords/NewKeyWord";
import { ConfigurationEditor } from "../../CustomEditor/SMTPEditor.component";
import { convertHTMLToDraftState } from "../../../utils/Utils";

import { useCountryById } from "../../../hooks";
import { DAV_APIS } from "../../../Adapter";

const EditCountry = (props) => {
  let DarkMode = false;
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const selectedCountry = query.get("country");
  const { country, isLoading: isFetching } = useCountryById(selectedCountry);
  const isLoading = isFetching;
  const [isEditing, setIsEditing] = useState(false);

  const [keys, setKeys] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [editorState, setEditorState] = useState(() =>
    convertHTMLToDraftState(country.description)
  );
  const [values, setValues] = useState({
    name: country.name,
    title: country.title,
    description: country.description,
    cover_image: "",
    countrySummary: country.summary,
    specialist: country.specialist,

    selectedImage: "",
  });

  useEffect(() => {
    setValues({
      name: country.name,
      title: country.title,
      description: country.description,
      cover_image: country.countryImage,
      countrySummary: country.summary,
      specialist: country.specialist,

      selectedImage: country.countryImage,
    });
    setEditorState(convertHTMLToDraftState(country.description));

    // eslint-disable-next-line
  }, [country]);

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
    setIsEditing(true);
    e.preventDefault();
    if (values.name.length < 1) {
      window.scrollTo(0, 0);
      return setError("Country title is required");
    }
    if (values.title.length < 1) {
      window.scrollTo(0, 0);
      return setError("Country title is required");
    }

    if (values.cover_image.length < 1) {
      window.scrollTo(0, 0);
      return setError("Country cover image required");
    }

    if (values.description.length < 1) {
      window.scrollTo(0, 0);
      return setError("Country Description required");
    }

    if (values.countrySummary.length < 1) {
      window.scrollTo(0, 0);
      return setError("Country Summary required");
    }
    if (values.specialist.length < 1) {
      window.scrollTo(0, 0);
      return setError("Specialist required");
    }

    try {
      const data = {
        name: values.name,
        title: values.title,
        description: values.description,
        countrySummary: values.countrySummary,
        specialist: values.specialist,
        selectedImage: values.selectedImage,

        key_words: JSON.stringify(keys),
      };
      await DAV_APIS.editCountry(data, country.id);

      setIsEditing(false);
      toast.success("Changes saved Successfully");
      setMessage(`Changes to ${country.name} saved Successfully`);

      setValues({
        name: "",
        title: "",
        description: "",
        cover_image: "",
        countrySummary: "",
        specialist: "",
        slug: "",
        selectedImage: "",
      });

      navigate("/dashboard/manage-countries");
    } catch (error) {
      setIsEditing(false);
      toast.error("Failed to save changes!");
      setError("Country Registration Failed");
    }
  };

  return (
    <Container fluid>
      <div className={styles.back_btn}>
        <Link
          to="/dashboard/manage-countries"
          className={styles.back_btn_wrapper}
        >
          <BackIcon />
          Back
        </Link>
      </div>
      <section className={styles.gpa__registration_section}>
        <h1
          className={`${styles.gpa__membership_section_title} ${
            DarkMode ? styles.gpa__dark_mode : ""
          }`}
        >
          Edit Country
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
            {isFetching ? (
              <Loader />
            ) : (
              <Form onSubmit={RegisterFormSubmitHandler}>
                <TextField
                  fullWidth
                  label="Country Name"
                  variant="filled"
                  value={values.name}
                  name="name"
                  size="small"
                  onChange={onChangeHandler}
                  className={styles.gpa__form_input_field}
                />
                <TextField
                  fullWidth
                  label="Country Headline"
                  variant="filled"
                  value={values.title}
                  name="title"
                  size="small"
                  onChange={onChangeHandler}
                  className={styles.gpa__form_input_field}
                />
                <ConfigurationEditor
                  placeholder="Type country description here..."
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
                      setValues({
                        ...values,
                        description: currentContentAsHTML,
                      });
                    }
                  }}
                />

                <div className="row">
                  <div className="col-xs-12 col-sm-9">
                    <TextField
                      className={styles.gpa__form_input_field}
                      label="Country summary"
                      placeholder="Write each on a new line"
                      multiline
                      value={values.countrySummary}
                      name="countrySummary"
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
                      tourImage={values.cover_image}
                      uploaded={true}
                      tourImageHandler={tourImageHandler}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-sm-12">
                    <TextField
                      fullWidth
                      label="Country Specialist"
                      variant="filled"
                      name="specialist"
                      value={values.specialist}
                      onChange={onChangeHandler}
                      className={styles.gpa__register_form_right_wrapper}
                    />
                  </div>
                </div>

                <NewKeyWord
                  setKeys={setKeys}
                  keys={keys}
                  key_words={country && country.key_words}
                />

                <Row>
                  <Col xs={{ span: 8, offset: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isEditing}
                      className={`${styles.gpa__register_submit_button} ${
                        DarkMode ? styles.gpa__dark_mode : ""
                      }`}
                    >
                      {isEditing ? "Saving changes..." : "Save changes"}
                      {isFetching | isLoading ? (
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
            )}
          </div>
        </Paper>
      </section>
    </Container>
  );
};

export default EditCountry;
