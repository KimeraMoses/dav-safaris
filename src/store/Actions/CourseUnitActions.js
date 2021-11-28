import { baseUrl } from "..";
import {
  UpdateUserCourseUnitsFail,
  UpdateUserCourseUnitsPending,
  UpdateUserCourseUnitsSuccess,
} from "../Slices/authSlice";
import {
  fetchCourseUnitFail,
  fetchCourseUnitPending,
  fetchCourseUnitSuccess,
} from "../Slices/courseUnitSlice";
import {
  NewCourseUnitPending,
  NewCourseUnitSuccess,
  NewCourseUnitFail,
  fetchCourseUnitsPending,
  fetchCourseUnitsSuccess,
  fetchCourseUnitsFail,
  fetchCourseCourseUnitsPending,
  fetchCourseCourseUnitsSuccess,
  fetchCourseCourseUnitsFail,
} from "../Slices/courseUnitsSlice";
import {
  EditCourseUnitPending,
  EditCourseUnitSuccess,
  EditCourseUnitFail,
} from "../Slices/editCourseUnit";
import {
  DeregisterUserFail,
  DeregisterUserPending,
  DeregisterUserSuccess,
  EnrollUserFail,
  EnrollUserPending,
  EnrollUserSuccess,
} from "../Slices/enrollUserSlice";
// import { SaveTokenInLocalStorage } from "./AuthActions";
import { fetchUsers } from "./UserActions";

export const fetchAllCourseUnits = () => async (dispatch) => {
  dispatch(fetchCourseUnitsPending());
  try {
    const response = await fetch(`${baseUrl}/api/v1/courseUnits/getAll`);
    const fetchedCourseUnits = await response.json();
    dispatch(fetchCourseUnitsSuccess(fetchedCourseUnits.course_units));
  } catch (error) {
    dispatch(fetchCourseUnitsFail(error));
  }
};

export const fetchCourseCourseUnits = (course_id) => async (dispatch) => {
  dispatch(fetchCourseCourseUnitsPending());
  try {
    const response = await fetch(`${baseUrl}/api/v1/courseUnits/getCourseUnitByCourseId?course=${course_id}`);
    const fetchedCourseUnits = await response.json();
    dispatch(fetchCourseCourseUnitsSuccess(fetchedCourseUnits.courseUnits));
  } catch (error) {
    dispatch(fetchCourseCourseUnitsFail(error));
  }
};

export const fetchCourseUnit = (course_unit_id) => async (dispatch) => {
  dispatch(fetchCourseUnitPending());
  try {
    const response = await fetch(
      `${baseUrl}/api/v1/courseUnits/${course_unit_id}`
    );
    const fetchedcourseunit = await response.json();
    dispatch(fetchCourseUnitSuccess(fetchedcourseunit.course_unit));
  } catch (error) {
    dispatch(fetchCourseUnitFail(error));
  }
};

export const creatNewCourseUnit = (
  no_credit_units,
  name,
  courses_attached_to,
  code,
  semester,
  year,
  category,
  lecturer
) => {
  return async (dispatch) => {
    dispatch(NewCourseUnitPending());
    const response = await fetch(`${baseUrl}/api/v1/courseUnits/register`, {
      method: "POST",
      body: JSON.stringify({
        no_credit_units,
        name,
        courses_attached_to,
        code,
        semester,
        year,
        category,
        lecturer
      }),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch(NewCourseUnitFail(error));
      console.log(error)
    }
    const data = await response.json();
    dispatch(NewCourseUnitSuccess(data));
  };
};

export const editCourseUnit = (
  no_credit_units,
  name,
  courses_attached_to,
  code,
  semester,
  year,
  category,
  course_unit_id,
  lecturer
) => {
  return async (dispatch) => {
    dispatch(EditCourseUnitPending());
    const response = await fetch(
      `${baseUrl}/api/v1/courseUnits/edit/${course_unit_id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          no_credit_units,
          name,
          courses_attached_to,
          code,
          semester,
          year,
          category,
          lecturer
        }),
        headers: new Headers({
          "Content-type": "application/json",
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      dispatch(EditCourseUnitFail(error));
    }
    const data = await response.json();
    dispatch(EditCourseUnitSuccess(data));
  };
};

export const EnrollUser = (AuthToken, course_unit_id) => {

  return async (dispatch) => {
    dispatch(EnrollUserPending());
    dispatch(UpdateUserCourseUnitsPending());
    const response = await fetch(
      `${baseUrl}/api/v1/courseUnits/enrollUser/${course_unit_id}`,
      {
        method: "GET",
        headers: new Headers({
          "Content-type": "application/json",
          Authorization: "Bearer " + AuthToken,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      dispatch(EnrollUserFail(error));
      dispatch(UpdateUserCourseUnitsFail(error));
      
    }
    const data = await response.json();
    dispatch(EnrollUserSuccess(data));
    dispatch(UpdateUserCourseUnitsSuccess(data));
    localStorage.setItem("CurrentUser", JSON.stringify(data.user))
  };
};

export const DeregisterUser = (AuthToken, course_unit_id) => {
  return async (dispatch) => {
    dispatch(DeregisterUserPending());
    dispatch(UpdateUserCourseUnitsPending());
    try {
      const response = await fetch(
        `${baseUrl}/api/v1/courseUnits/deregister/${course_unit_id}`,
        {
          method: "GET",
          headers: new Headers({
            "Content-type": "application/json",
            Authorization: "Bearer " + AuthToken,
          }),
        }
      );
      const data = await response.json();
      dispatch(DeregisterUserSuccess(data));
      dispatch(UpdateUserCourseUnitsSuccess(data));
      localStorage.setItem("CurrentUser", JSON.stringify(data.user))
      dispatch(fetchUsers(AuthToken));
    } catch (error) {
      dispatch(DeregisterUserFail(error));
      dispatch(UpdateUserCourseUnitsFail(error));
    }
  };
};
