import { baseUrl } from "..";
import {
  fetchCoursesLoading,
  fetchCoursesSuccess,
  fetchCoursesFail,
} from "../Slices/coursesSlice";
import {
  fetchCourseDetailsLoading,
  fetchCourseDetailsSuccess,
  fetchCourseDetailsFail
} from "../Slices/courseSlice";
import {
  EditCourseFail,
  EditCoursePending,
  EditCourseSuccess,
} from "../Slices/editCourseSlice";
import {
  NewCoursePending,
  NewCourseSuccess,
  NewCourseFail,
} from "../Slices/newCourseSlice";

export const fetchAllCourses = () => async (dispatch) => {
  dispatch(fetchCoursesLoading());
  try {
    const response = await fetch(`${baseUrl}/api/v1/courses/getAll/`);
    const fetchedCourses = await response.json();
    dispatch(fetchCoursesSuccess(fetchedCourses.courses));
  } catch (error) {
    dispatch(fetchCoursesFail(error.message));
  }
};

export const createNewCourse = (
  course_initials,
  name,
  university,
  code,
  category,
  num_years
) => {
  return async (dispatch) => {
    dispatch(NewCoursePending());
    const response = await fetch(`${baseUrl}/api/v1/courses/register`, {
      method: "POST",
      body: JSON.stringify({
        course_initials,
        name,
        university,
        code,
        category,
        num_years,
      }),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch(NewCourseFail(error));
    }
    const data = await response.json();
    dispatch(NewCourseSuccess(data));
  };
};

export const fetchCourseDetails = (course_id) => async (dispatch) => {
  dispatch(fetchCourseDetailsLoading());
  try {
    const response = await fetch(
      `${baseUrl}/api/v1/courses/${course_id}`
    );
    const fetchedCourse = await response.json();
    dispatch(fetchCourseDetailsSuccess(fetchedCourse));

  } catch (error) {
    dispatch(fetchCourseDetailsFail(error.message));
  }
};

export const EditCourseDetails = (
  course_id,
  course_initials,
  name,
  university,
  // code,
  category,
  num_years
  
) => {
  return async (dispatch) => {
    dispatch(EditCoursePending());
    const response = await fetch(`${baseUrl}/api/v1/courses/edit/${course_id}`, {
      method: "PUT",
      body: JSON.stringify({
        course_initials,
        name,
        university,
        // code,
        category,
        num_years,
      }),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    });
    const data = await response.json();
    dispatch(EditCourseSuccess(data));
    if (!response.ok) {
      const error = await response.json();
      dispatch(EditCourseFail(error));
    }
    
  };
};
