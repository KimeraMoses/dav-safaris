import React, { useState } from "react";

import { toast } from "react-toastify";
import { convertToRaw } from "draft-js";
import { convertToHTML } from "draft-convert";
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
import { useAllCountries, useCategoryById } from "../../../hooks";

import { DAV_APIS } from "../../../Adapter";

const EditCategory = (props) => {
  //====GET THE SELECTED DOCUMENT CATEGORY====//
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const selectedCategory = query.get("category");

  const { category, isLoading: isFetching } = useCategoryById(selectedCategory);

  const isLoading = isFetching;
  const { countries } = useAllCountries();
  const DarkMode = false;
  const [isEditing, setIsEditing] = useState(false);

  const countryArray = countries;

  const [keys, setKeys] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [editorState, setEditorState] = useState(() =>
    convertHTMLToDraftState(category.description)
  );

  const [values, setValues] = useState({
    name: category?.name,
    description: category?.description,
    country: category?.country?.name,

    cover_image: "",
    selectedImage: "",
  });

  useEffect(() => {
    setValues({
      name: category?.name,
      description: category.description,
      country: category?.country?.name,

      cover_image: category.tourCategoryImage,
      selectedImage: category.tourCategoryImage,
    });

    setEditorState(convertHTMLToDraftState(category.description));
    // eslint-disable-next-line
  }, [category]);

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
    const countryId = countries.find(
      (country) => country.name === values.country
    )?.id;

    try {
      const data = {
        name: values.name,
        description: values.description,
        country: countryId,

        selectedImage: values.selectedImage,
      };

      await DAV_APIS.editCategory(data, category.id);

      setIsEditing(false);
      setMessage(`Changes to ${category.name} saved Successfully`);
      toast.success(`Changes to ${category.name} saved Successfully`);
      navigate("/dashboard/manage-tour-categories");

      setValues({
        name: "",
        description: "",

        cover_image: "",
        selectedImage: "",
      });
    } catch (error) {
      setIsEditing(false);
      toast.error("Failed to save changes!");
      setError("Tour Registration Failed");
    }
  };

  return (
    <Container fluid>
      <div className={styles.back_btn}>
        <Link
          to="/dashboard/manage-tour-categories"
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
          Edit Tour Category
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
                      setValues({
                        ...values,
                        description: currentContentAsHTML,
                      });
                    }
                  }}
                />

                <div className="row">
                  <div className="col-xs-12 col-sm-4">
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
                        {countryArray?.map((country, index) => (
                          <MenuItem key={index} value={country?.name}>
                            {country?.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                <div className="row"></div>
                <div className="row"></div>
                <NewKeyWord setKeys={setKeys} keys={keys} />

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
                      {isLoading | isEditing ? (
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

export default EditCategory;
