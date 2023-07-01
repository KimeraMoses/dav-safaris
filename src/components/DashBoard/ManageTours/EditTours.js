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
import {
  TourCategories_Kenya,
  TourCategories_Rwanda,
  TourCategories_Tanzania,
  TourCategories_Uganda,
} from "../../../containers/Countries/TourCategories";
import ImageUpload from "../../NewItems/ImageUpload";
import NewItinary from "../../NewItems/NewItinary";
import { useLocation, useNavigate } from "react-router";
import EditItinaryModal from "./Itinary/EditItinary";
import { Link } from "react-router-dom";
import Loader from "../../../containers/Loader/Loader";
import NewKeyWord from "./Keywords/NewKeyWord";
import { ConfigurationEditor } from "../../CustomEditor/SMTPEditor.component";
import { convertHTMLToDraftState } from "../../../utils/Utils";
import { DAV_APIS } from "../../../Adapter";

let dayActivityDescription = [];

const EditTour = () => {
  const DarkMode = false;
  // const isLoading = useSelector((state) => state.editTour.isLoading);
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [Tour, setTour] = useState({});
  const [keys, setKeys] = useState([]);
  const [open, setOpen] = useState(false);
  const [Itinary, setItinary] = useState({});
  const [EditedItinary, setEditedItinary] = useState("");
  const [type, setType] = useState("Edit");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [TourCategories, setTourCategories] = useState([]);

  const fetchTourDetails = async (tour_id) => {
    setFetching(true);
    try {
      const res = await DAV_APIS.get.getTourById(tour_id);
      setTour(res.data.tour);
      dayActivityDescription = [];

      res.data.tour.dayActivityDescription.forEach((tour) => {
        dayActivityDescription.push(tour);
      });
      setFetching(false);
    } catch (error) {
      setFetching(false);
    }
  };

  //====GET THE SELECTED DOCUMENT CATEGORY====//
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();
  const tourId = query.get("tour");

  useEffect(() => {
    fetchTourDetails(tourId);

    // eslint-disable-next-line
  }, [tourId]);

  let tourHighLights = "";
  Tour && Tour?.tourActivities?.map((el) => (tourHighLights += el + "\n"));
  let tourIncludes = "";
  Tour &&
    Tour.packageDetails &&
    Tour.packageDetails.price_inludes &&
    Tour.packageDetails.price_inludes?.map((el) => (tourIncludes += el + "\n"));
  let tourExclude = "";
  Tour &&
    Tour.packageDetails &&
    Tour.packageDetails.price_excludes &&
    Tour.packageDetails.price_excludes?.map((el) => (tourExclude += el + "\n"));

  const [editorState, setEditorState] = useState(() =>
    convertHTMLToDraftState(Tour.description)
  );
  const [values, setValues] = useState({
    name: Tour.name,
    bodyText: Tour.description,
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

  useEffect(() => {
    setValues({
      ...values,
      name: Tour.name,
      description: Tour.description,
      tourActivities: tourHighLights,
      cover_image: Tour.imageCover,
      selectedImage: Tour.imageCover,
      country: Tour.country,
      category: Tour.category,
      duration: Tour.duration,
      price: Tour.price,
      includes: tourIncludes,
      excludes: tourExclude,
    });
    setEditorState(convertHTMLToDraftState(Tour.description));

    // eslint-disable-next-line
  }, [Tour]);

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

  values.tourActivities &&
    values.tourActivities.split("\n").map((item) => tourActivities.push(item));

  //====FORMATING THE PRICE INCLUDES AND EXCLUDES====//
  let priceIncludes = [];
  let priceExcludes = [];

  values.includes &&
    values.includes.split("\n").map((item) => priceIncludes.push(item));

  values.excludes &&
    values.excludes.split("\n").map((item, index) => priceExcludes.push(item));

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

    setValues({
      ...values,
      day: "",
      itinaryTitle: "",
      itinaryDesc: "",
      meal_plan: "",
      accomodation_plan: "",
    });
  };

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

    if (values.selectedImage.length < 1) {
      return setError("Tour cover image required");
    }
    if (values.description.length < 1) {
      return setError("University Description required");
    }
    setIsLoading(true);
    try {
      const data = {
        name: values.name,
        description: values.description,
        tourActivities: JSON.stringify(tourActivities),
        dayActivityDescription: JSON.stringify(dayActivityDescription),
        duration: values.duration,
        price: values.price,
        file: values.selectedImage,
        packageDetails: JSON.stringify(packageDetails),
        category: values.category,
        country: values.country,
        key_words: JSON.stringify(keys),
      };
      const res = await DAV_APIS.editTour(data, Tour.id);
      setIsLoading(false);
      if (res.status === 200) {
        toast.success("Changes saved Successfully");
        setMessage(`Changes to ${Tour.name} saved Successfully`);
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
      }
      navigate("/dashboard/manage-tours");
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed to save changes!");
      setError("Tour Registration Failed");
    }
  };

  const onEditClick = (id) => {
    setType("Edit");
    const Activity = dayActivityDescription[id];

    setItinary(Activity);
    setEditedItinary(id);
    setOpen(true);
  };
  const onDeleteClick = (id) => {
    setType("Delete");
    setOpen(true);
    setEditedItinary(id);
  };

  return (
    <Container fluid>
      <div className={styles.back_btn}>
        <Link to="/dashboard/manage-tours" className={styles.back_btn_wrapper}>
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
          Edit Tour
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
            {fetching ? (
              <Loader />
            ) : (
              <Form onSubmit={RegisterFormSubmitHandler}>
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
                <ConfigurationEditor
                  placeholder="Type tour description here..."
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
                {/* <TextField
                  className={styles.gpa__form_input_field}
                  label="Tour Description"
                  multiline
                  value={values.description}
                  name="description"
                  onChange={onChangeHandler}
                  rows={6}
                  fullWidth
                  variant="filled"
                /> */}
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
                  dayActivity={dayActivityDescription}
                  days={values.duration}
                  onEditClick={onEditClick}
                  isEdit={true}
                  onDeleteClick={onDeleteClick}
                />

                <NewKeyWord
                  setKeys={setKeys}
                  keys={keys}
                  key_words={Tour && Tour.key_words}
                />

                <Row>
                  <Col xs={{ span: 8, offset: 2 }}>
                    <Button
                      disabled={isLoading}
                      variant="contained"
                      color="primary"
                      type="submit"
                      className={`${styles.gpa__register_submit_button} ${
                        DarkMode ? styles.gpa__dark_mode : ""
                      }`}
                    >
                      {isLoading ? "Saving changes..." : "Save changes"}
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
            )}
          </div>
        </Paper>
        <EditItinaryModal
          type={type}
          open={open}
          setOpen={setOpen}
          data={Itinary}
          EditedItinary={EditedItinary}
          dayActivityDescription={dayActivityDescription}
        />
      </section>
    </Container>
  );
};

export default EditTour;
