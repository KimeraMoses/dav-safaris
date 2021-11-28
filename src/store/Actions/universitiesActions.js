import {
  fetchUniversitiesLoading,
  fetchUniversitiesSuccess,
  fetchUniversitiesFail,
} from "../Slices/universitiesSlice";

import {
  fetchUniversitypending, fetchUniversitySuccess, fetchUniversityFail
} from "../Slices/universitySlice";

import {
  NewUnversityPending,
  NewUnversitySuccess,
  NewUnversityFail,
} from "../Slices/newUniversitySlice";
import {
  EditUnversityPending, EditUnversitySuccess, EditUnversityFail
} from "../Slices/editUniversitySlice";

import { baseUrl } from "..";

export const fetchAllUniversities = () => async (dispatch) => {
  dispatch(fetchUniversitiesLoading());
  try {
    const response = await fetch(`${baseUrl}/api/v1/universities/getAll`);
    const fetchedUniversities = await response.json();
    dispatch(fetchUniversitiesSuccess(fetchedUniversities.universities));
  } catch (error) {
    dispatch(fetchUniversitiesFail(error.message));
  }
};

export const fetchUniversityDetail = (uni_id) => async (dispatch) => {
  dispatch(fetchUniversitypending());
  try {
    const response = await fetch(
      `${baseUrl}/api/v1/universities/${uni_id}`
    );
    const fetchedUniversity = await response.json();
    dispatch(fetchUniversitySuccess(fetchedUniversity));

  } catch (error) {
    dispatch(fetchUniversityFail(error.message));
  }
};


export const creatNewUniversity = (
  name,
  code,
  description,
  logo,
  courseCategories,
  links,
) => {
  return async (dispatch) => {
    dispatch(NewUnversityPending());
    const response = await fetch(`${baseUrl}/api/v1/universities/register`, {
      method: "POST",
      body: JSON.stringify({
        name,
        code,
        description,
        logo,
        courseCategories,
        links,
      }),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch(NewUnversityFail(error));
    }
    const data = await response.json();
    dispatch(NewUnversitySuccess(data));
  };
};

export const EdituniversityDetails = (
  id,
  name,
  code,
  description,
  logo,
  courseCategories,
  links
) => {
  return async (dispatch) => {
      dispatch(EditUnversityPending());
      const response = await fetch(
        `${baseUrl}/api/v1/universities/edit/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name,
            code,
            description,
            logo,
            courseCategories,
            links,
          }),
          headers: new Headers({
            "Content-type": "application/json",
          }),
        }
      );
      if (!response.ok) {
        const error = await response.json();
        dispatch(EditUnversityFail(error.message));
      }
      const data = await response.json();
      dispatch(EditUnversitySuccess(data.status));
    };
};