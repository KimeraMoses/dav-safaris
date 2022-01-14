import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//===REDUX STORE IMPORTS===
import { useDispatch, useSelector } from "react-redux";
// import { fetchAllCourses, fetchCourseDetails } from "../../../../../store/Actions/CourseActions";

//===MUI IMPORTS===
import { Grid } from "@material-ui/core";

//===REAACT BOOTSTRAP IMPORTS===
import { Container } from "react-bootstrap";

//===COMPONNENT IMPORTS===
// import Spinner from "../../../../Spinner/Spinner";
// import CourseList from "./CourseList";
// import NewCourse from "../../../../NewItems/NewCourse/NewCourse";
// import EditCourse from "../../../../NewItems/NewCourse/EditCourse";
import classes from "./DashboardItems.module.css";
import LoginForm from "../../Membership/LoginForm/LoginForm";
import TourList from "./TourList"

const ManageTour = () => {
  const isLoading = false;
  const userToken = useSelector(state=>state.auth.token);
  const DarkMode = false;
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchAllCourses());

  }, []);
  const onAddClick = () => {
    setIsEdit(false);
  };
  const onEditClick = (course_id) => {
    // dispatch(fetchCourseDetails(course_id));
    setIsEdit(true);
  };
  return (
    <Container fluid className={classes.gpa__manage_items_wrapper}>
      <Grid item lg={4} md={4} sm={12} className={classes.gpa__manage_university_list_wrapper}>
        <TourList
          onAddClick={onAddClick}
          onEditClick={onEditClick}
          isEdit = {!isEdit}
        />
      </Grid>
      <Grid
        item
        lg={8}
        md={8}
        sm={12}
        className={`${classes.gpa__manage_university_details_wrapper} ${
          DarkMode ? classes.gpa__dark_mode : ""
        }`}
      >
          <LoginForm/>
        {/* {isLoading ? (
          <Spinner />
        ) : isEdit ? (
          <EditCourse setIsEdit={setIsEdit}/>
        ) : (
          <NewCourse />
        )} */}
      </Grid>
    </Container>
  );
};

export default ManageTour;
