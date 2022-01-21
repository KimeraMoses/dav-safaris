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
import NewItinary from "./NewItinary";
import ImageUpload from "./ImageUpload";
import { useEffect } from "react";
import { creatNewTour, editTourDetails } from "../../store/Actions/TourActions";
import {
  TourCategories_Kenya,
  TourCategories_Rwanda,
  TourCategories_Tanzania,
  TourCategories_Uganda,
} from "./TourCategories";
import { AddDays, DeleteDay } from "../../store/Slices/newTourSlice";

let dayActivityDescription = [];

console.log("Outside", dayActivityDescription);

const NewTour = (props) => {
  const DarkMode = false;
  const isEditing = useSelector((state) => state.editTour.isLoading);
  const isLoading = useSelector((state) => state.newTour.isLoading);
  const Tour = useSelector((state) => state.tour.tourDetails);
  const DayActivities = useSelector((state) => state.newTour.days);
  const { isEdit,setIsEdit } = props;
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(false);
  const [category, setCategory] = useState([]);
  const [itinaries, setItinaries] = useState([]);
  const [TourCategories, setTourCategories] = useState([]);

  let tourHighLights = "";
  Tour &&
    Tour.tourActivities.map((el) => {
      tourHighLights += el + "\n";
    });
  let tourIncludes = "";
  Tour &&
    Tour.packageDetails &&
    Tour.packageDetails.price_inludes &&
    Tour.packageDetails.price_inludes.map((el) => {
      tourIncludes += el + "\n";
    });
  let tourExclude = "";
  Tour &&
    Tour.packageDetails &&
    Tour.packageDetails.price_excludes &&
    Tour.packageDetails.price_excludes.map((el) => {
      tourExclude += el + "\n";
    });

  const [values, setValues] = useState({
    name: Tour.name,
    description: Tour.description,
    tourActivities: tourHighLights,
    cover_image: "",
    selectedImage: "",
    country: Tour.country,
    category: Tour.category,
    duration: Tour.duration,
    price: Tour.price,

    includes: tourIncludes,
    excludes: tourExclude,
    day: "",
    itinaryTitle: "",
    itinaryDesc: "",
    meal_plan: "",
    accomodation_plan: "",
  });
  useEffect(() => {}, [values]);

  useEffect(() => {
    switch (values.country) {
      case "uganda":
        setTourCategories(TourCategories_Uganda);
        break;
      case "kenya":
        setTourCategories(TourCategories_Kenya);
        break;
      case "rwanda":
        setTourCategories(TourCategories_Rwanda);
        break;
      case "tanzania":
        setTourCategories(TourCategories_Tanzania);
        break;
      default:
        break;
    }
  }, [values.country]);

  //====FORMATING THE TOUR HIGHLIGHTS====//
  let tourActivities = [];
  {
    values.tourActivities &&
      values.tourActivities.split("\n").map((item, index) => {
        tourActivities.push(item);
      });
  }
  // console.log(tourActivities);

  //====FORMATING THE PRICE INCLUDES AND EXCLUDES====//
  let priceIncludes = [];
  let priceExcludes = [];
  {
    values.includes &&
      values.includes.split("\n").map((item, index) => {
        priceIncludes.push(item);
      });
  }
  {
    values.excludes &&
      values.excludes.split("\n").map((item, index) => {
        priceExcludes.push(item);
      });
  }

  const packageDetails = {
    price_inludes: priceIncludes,
    price_excludes: priceExcludes,
  };

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

  const ItinaryHandler = () => {
    const itinary = {
      day: values.day,
      title: values.itinaryTitle,
      description: values.itinaryDesc,
      meal_plan: values.meal_plan,
      accomodation: values.accomodation_plan,
    };

    dayActivityDescription.push(itinary);
    dispatch(AddDays(itinary));

    setValues({
      ...values,
      day: "",
      itinaryTitle: "",
      itinaryDesc: "",
      meal_plan: "",
      accomodation_plan: "",
    });
  };

  console.log("Inside", dayActivityDescription);

  const RegisterFormSubmitHandler = async (e) => {
    e.preventDefault();
    if (values.itinaryTitle.length > 0) {
      ItinaryHandler();
    }
    if (values.name.length < 1) {
      return setError("Tour title is required");
    }
    if (values.price.length < 1) {
      return setError("Tour price is required");
    }

    if (!isEdit && values.selectedImage.length < 1) {
      return setError("Tour cover image required");
    }
    if (values.description.length < 1) {
      return setError("University Description required");
    }

    try {
      await dispatch(
        isEdit
          ? editTourDetails(
              values.name,
              values.description,
              JSON.stringify(tourActivities),
              JSON.stringify(dayActivityDescription),
              values.duration,
              values.price,
              values.selectedImage,
              JSON.stringify(packageDetails),
              values.category,
              values.country,
              Tour.id
            )
          : creatNewTour(
              values.name,
              values.description,
              JSON.stringify(tourActivities),
              JSON.stringify(dayActivityDescription),
              values.duration,
              values.price,
              values.selectedImage,
              JSON.stringify(packageDetails),
              values.category,
              values.country
            )
      );
      setMessage(
        `${isEdit ? "Changes to " : ""} ${Tour.name} ${
          isEdit ? "saved" : "Created"
        } Successfully`
      );
      setTourCategories([]);
      setValues({
        name: "",
        description: "",
        tourActivities: "",
        cover_image: "",
        selectedImage: "",
        country: "",
        category: "",
        duration: "",
        price: "",
        includes: "",
        excludes: "",
        day: "",
        itinaryTitle: "",
        itinaryDesc: "",
        meal_plan: "",
        accomodation_plan: "",
      });
      dayActivityDescription = [];
      tourActivities = [];
      priceIncludes = [];
      priceExcludes = [];
      setIsEdit(false)
    } catch (error) {
      setError("Tour Registration Failed");
    }
  };
  let filteredItinaries = DayActivities;

  const onEditClick = (id) => {
    console.log("id", id);
    filteredItinaries = DayActivities.filter((item, index) => id !== index);
    console.log("Inside", filteredItinaries);
    dispatch(DeleteDay(id));
  };

  return (
    <Container fluid>
      <section className={styles.gpa__registration_section}>
        <h1
          className={`${styles.gpa__membership_section_title} ${
            DarkMode ? styles.gpa__dark_mode : ""
          }`}
        >
          Create New Tour
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
              {/* {values.code.split("\n").map((item, index) => {
                pricesIncludes.push(item);
                // console.log("Included", pricesIncludes);
                return (
                  <>
                    <li key={index}>{item}</li>
                  </>
                );
              })} */}
              <TextField
                fullWidth
                label="Tour Title"
                variant="filled"
                value={values.name}
                name="name"
                size="small"
                onChange={onChangeHandler}
                className={styles.gpa__form_input_field}
              />
              <TextField
                className={styles.gpa__form_input_field}
                label="Tour Description"
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
                    label="Tour Highlights"
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
                    tourImage={values.cover_image}
                    Image={Tour.imageCover}
                    uploaded={true}
                    tourImageHandler={tourImageHandler}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-3">
                  <FormControl
                    variant="filled"
                    fullWidth
                    className={`${styles.gpa__form_input_field}`}
                  >
                    <InputLabel>Country</InputLabel>
                    <Select
                      id="gpa__level_select_input"
                      value={values.country}
                      name="country"
                      onChange={onChangeHandler}
                    >
                      <MenuItem value="uganda">Uganda</MenuItem>
                      <MenuItem value="kenya">Kenya</MenuItem>
                      <MenuItem value="tanzania">Tanzania</MenuItem>
                      <MenuItem value="rwanda">Rwanda</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-xs-12 col-sm-3">
                  <FormControl
                    variant="filled"
                    fullWidth
                    className={`${styles.gpa__form_input_field}`}
                  >
                    <InputLabel>Tour Category</InputLabel>
                    <Select
                      id="gpa__level_select_input"
                      value={values.category}
                      name="category"
                      onChange={onChangeHandler}
                    >
                      {TourCategories.length > 0 ? (
                        TourCategories.map((category, index) => {
                          return (
                            <MenuItem key={index} value={category.value}>
                              {category.name}
                            </MenuItem>
                          );
                        })
                      ) : (
                        <MenuItem>
                          <Alert severity="error">
                            Please choose a country first!
                          </Alert>
                        </MenuItem>
                      )}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-xs-12 col-sm-3">
                  <TextField
                    fullWidth
                    label="Number of Days"
                    variant="filled"
                    name="duration"
                    value={values.duration}
                    onChange={onChangeHandler}
                    className={styles.gpa__register_form_right_wrapper}
                  />
                </div>
                <div className="col-xs-12 col-sm-3">
                  <TextField
                    fullWidth
                    label="Minimum Price($)"
                    variant="filled"
                    type="number"
                    name="price"
                    value={values.price}
                    onChange={onChangeHandler}
                    className={styles.gpa__register_form_right_wrapper}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-6">
                  <TextField
                    className={styles.gpa__form_input_field}
                    label="Price Includes"
                    placeholder="Write each item on a new line"
                    multiline
                    value={values.includes}
                    name="includes"
                    onChange={onChangeHandler}
                    rows={4}
                    fullWidth
                    variant="filled"
                  />
                </div>

                <div
                  className={`col-xs-12 col-sm-6 ${styles.gpa__register_form_right_wrapper}`}
                >
                  <TextField
                    className={styles.gpa__form_input_field}
                    label="Price Excludes"
                    placeholder="Write each item on a new line"
                    multiline
                    value={values.excludes}
                    name="excludes"
                    onChange={onChangeHandler}
                    rows={4}
                    fullWidth
                    variant="filled"
                  />
                </div>
              </div>
              <NewItinary
                values={values}
                setValues={setValues}
                ItinaryHandler={ItinaryHandler}
                dayActivity={Tour.dayActivityDescription}
                days={values.duration}
                onEditClick={onEditClick}
                isEdit={isEdit}
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
                    {/* {isEditing || isLoading
                      ? "Creating Tour..."
                      : "Create Tour"}
                    {isLoading ? (
                      <Spinner
                        thickness={2}
                        size={20}
                        style={{ marginLeft: 5 }}
                      />
                    ) : null} */}
                    {isEdit
                      ? isEditing
                        ? "Saving changes..."
                        : "Save changes"
                      : isLoading
                      ? "Creating Tour..."
                      : "Create Tour"}
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
          </div>
        </Paper>
      </section>
    </Container>
  );
};

export default NewTour;
