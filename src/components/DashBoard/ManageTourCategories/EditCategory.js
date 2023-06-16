import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

import { editCategoryDetails } from "../../../store/Actions/TourCategoriesActions";
import { useLocation, useNavigate } from "react-router";
import { fetchAllCountrys } from "../../../store/Actions/CountryActions";
import {
  fetchCategoryPending,
  fetchCategorySuccess,
  fetchCategoryFail,
  categoryFetchIsLoading,
} from "../../../store/Slices/fetchCategorySlice";
import { selectAllCountries } from "../../../store/Slices/countrySlice";
import { baseUrl } from "../../../store";
import { Link } from "react-router-dom";
import Loader from "../../../containers/Loader/Loader";
import NewKeyWord from "./Keywords/NewKeyWord";
import { ConfigurationEditor } from "../../CustomEditor/SMTPEditor.component";
import { convertHTMLToDraftState } from "../../../utils/Utils";

const EditCategory = (props) => {
  const DarkMode = false;
  const isEditing = useSelector((state) => state.editTour.isLoading);
  const isFetching = useSelector(categoryFetchIsLoading);
  const [isLoading, setIsLoading] = useState(false);
  const CountryList = useSelector(selectAllCountries);
  const [countryArray, setCountryArray] = useState([]);
  const [category, setCategory] = useState({});
  const [keys, setKeys] = useState([]);
  const [type, setType] = useState("Edit");
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    dispatch(fetchAllCountrys());
  }, [dispatch]);
  useEffect(() => {
    setCountryArray(CountryList?.countries);
  }, [CountryList]);

  const fetchCategoryDetails = (cat_id) => async (dispatch) => {
    dispatch(fetchCategoryPending());
    try {
      const response = await fetch(`${baseUrl}/api/v1/categories/${cat_id}`);
      const fetchedCategory = await response.json();
      console.log("Fetched", fetchedCategory);
      dispatch(fetchCategorySuccess(fetchedCategory.tourCategory));
      setCategory(fetchedCategory?.tourCategory);
    } catch (error) {
      dispatch(fetchCategoryFail(error.message));
    }
  };
  console.log(category.country);
  console.log("Country Name", category?.country?.id);

  //====GET THE SELECTED DOCUMENT CATEGORY====//
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const selectedCategory = query.get("category");

  useEffect(() => {
    dispatch(fetchCategoryDetails(selectedCategory));

    // eslint-disable-next-line
  }, [selectedCategory]);
  const [editorState, setEditorState] = useState(() =>
    convertHTMLToDraftState(category.description)
  );

  const [values, setValues] = useState({
    name: category.name,
    description: category.description,
    country: category?.country?.id,
    value: category.value,
    cover_image: "",
    selectedImage: "",
  });

  useEffect(() => {
    setValues({
      name: category.name,
      description: category.description,
      country: category?.country?.id,
      value: category.value,
      cover_image: category.tourCategoryImage,
      selectedImage: category.tourCategoryImage,
    });
    setEditorState(convertHTMLToDraftState(category.description));
    // eslint-disable-next-line
  }, [category]);
  console.log("Value of country", category?.country?.id, values.country);

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
      return setError("Tour category title is required");
    }
    if (values.value.length < 1) {
      window.scrollTo(0, 0);
      return setError("Tour category slug is required");
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

    try {
      await dispatch(
        editCategoryDetails(
          values.name,
          values.description,
          values.country,
          values.value,
          values.selectedImage,
          category.id
        )
      );
      setIsLoading(false);
      setMessage(`Changes to ${category.name} saved Successfully`);
      toast.success("Changes saved Successfully");
      navigate("/dashboard/manage-tour-categories");

      setValues({
        name: "",
        description: "",
        country: "",
        value: "",
        cover_image: "",
        selectedImage: "",
      });
    } catch (error) {
      setIsLoading(false);
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
                        {countryArray?.map((country) => {
                          return (
                            <MenuItem key={country?.id} value={country?.id}>
                              {country?.name}
                            </MenuItem>
                          );
                        })}
                        {/* <MenuItem value="uganda">Uganda</MenuItem>
                        <MenuItem value="kenya">Kenya</MenuItem>
                        <MenuItem value="tanzania">Tanzania</MenuItem>
                        <MenuItem value="rwanda">Rwanda</MenuItem> */}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-xs-12 col-sm-5">
                    <TextField
                      fullWidth
                      label="Category Slug"
                      variant="filled"
                      name="value"
                      value={values.value}
                      onChange={onChangeHandler}
                      className={styles.gpa__register_form_right_wrapper}
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
                <div className="row"></div>
                <div className="row"></div>
                <NewKeyWord
                  setKeys={setKeys}
                  keys={keys}
                  // key_words={Tour && Tour.key_words}
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
