import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
// import {
//   TourCategories_Kenya,
//   TourCategories_Rwanda,
//   TourCategories_Tanzania,
//   TourCategories_Uganda,
// } from "../../../containers/Countries/TourCategories";
import ImageUpload from "../../NewItems/ImageUpload";

import {
  // fetchCountryDetails,
  editCountryDetails,
} from "../../../store/Actions/CountryActions";
import { useLocation, useNavigate } from "react-router";

import { baseUrl } from "../../../store";
import { Link } from "react-router-dom";
import Loader from "../../../containers/Loader/Loader";
import NewKeyWord from "./Keywords/NewKeyWord";
import { ConfigurationEditor } from "../../CustomEditor/SMTPEditor.component";
import { convertHTMLToDraftState } from "../../../utils/Utils";

import { countryEditIsLoading } from "../../../store/Slices/editCountrySlice";
import {
  countryFetchIsLoading,
  // selectCountryDetails,
  fetchCountryFail,
  fetchCountryPending,
  fetchCountrySuccess,
} from "../../../store/Slices/fetchCountryDetailsSlice";

const EditCountry = (props) => {
  const DarkMode = false;
  const isEditing = useSelector(countryEditIsLoading);
  const isFetching = useSelector(countryFetchIsLoading);
  // const fetchedCountry = useSelector(selectCountryDetails);
  const [isLoading, setIsLoading] = useState(false);
  const [country, setCountry] = useState({});
  const [keys, setKeys] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchCountryDetails = (country_id) => async (dispatch) => {
    dispatch(fetchCountryPending());
    try {
      const response = await fetch(`${baseUrl}/api/v1/countries/${country_id}`);
      const fetchedCountry = await response.json();
      dispatch(fetchCountrySuccess(fetchedCountry.country));
      setCountry(fetchedCountry?.country);
    } catch (error) {
      dispatch(fetchCountryFail(error.message));
    }
  };
  console.log(country);

  //====GET THE SELECTED DOCUMENT CATEGORY====//
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const selectedCountry = query.get("country");
  useEffect(() => {
    dispatch(fetchCountryDetails(selectedCountry));
    // eslint-disable-next-li
  }, [dispatch, selectedCountry]);

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
    slug: country.slug,
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
      slug: country.slug,
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
    setIsLoading(true);
    e.preventDefault();
    if (values.name.length < 1) {
      window.scrollTo(0, 0);
      return setError("Country title is required");
    }
    if (values.title.length < 1) {
      window.scrollTo(0, 0);
      return setError("Country title is required");
    }

    if (values.selectedImage.length < 1) {
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
    if (values.slug.length < 1) {
      window.scrollTo(0, 0);
      return setError("Country slug required");
    }

    try {
      await dispatch(
        editCountryDetails(
          values.name,
          values.title,
          values.description,
          values.countrySummary,
          values.specialist,
          values.selectedImage,
          values.slug,
          JSON.stringify(keys),
          country.id
        )
      );
      setIsLoading(false);
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
      setIsLoading(false);
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
                  label="Country Title"
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
                      // Image={Tour.imageCover}
                      uploaded={true}
                      tourImageHandler={tourImageHandler}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
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
                  <div className="col-xs-12 col-sm-6">
                    <TextField
                      fullWidth
                      label="Country Slug"
                      variant="filled"
                      type="text"
                      name="slug"
                      value={values.slug}
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
                      // disabled={isLoading || values.logo.length < 1}
                      variant="contained"
                      color="primary"
                      type="submit"
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
