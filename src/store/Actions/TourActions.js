
import { baseUrl } from "..";
import { fetchTourFail, fetchTourPending, fetchTourSuccess } from "../Slices/tourSlice";
import { fetchToursPending } from "../Slices/toursSlice";

export const fetchAllTours = () => async (dispatch) => {
  dispatch(fetchToursPending());
  try {
    const response = await fetch(`${baseUrl}/api/v1/tours/getAllTours`);
    const fetchedTours = await response.json();
    dispatch(fetchToursSuccess(fetchedTours.tours));
  } catch (error) {
    dispatch(fetchToursFail(error.message));
  }
};

export const fetchAllCountryTours = () => async (dispatch) => {
  dispatch(fetchToursPending());
  try {
    const response = await fetch(`${baseUrl}/api/v1/tours/getAllTours`);
    const fetchedTours = await response.json();
    dispatch(fetchToursSuccess(fetchedTours.tours));
  } catch (error) {
    dispatch(fetchToursFail(error.message));
  }
};

export const fetchTourDetails = (tour_id) => async (dispatch) => {
  dispatch(fetchTourPending());
  try {
    const response = await fetch(
      `${baseUrl}/api/v1/tours/${tour_id}`
    );
    const fetchedTours = await response.json();
    dispatch(fetchTourSuccess(fetchedTours));

  } catch (error) {
    dispatch(fetchTourFail(error.message));
  }
};


export const creatNewTour = (
  name,
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

export const EditTourDetails = (
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