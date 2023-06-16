import { baseUrl } from "..";
import {
  NewCountryFail,
  NewCountryPending,
  NewCountrySuccess,
} from "../Slices/allCountrySlice";
import {
  fetchCountriesPending,
  fetchCountriesSuccess,
  fetchCountriesFail,
} from "../Slices/countrySlice";
import {
  EditCountryPending,
  EditCountrySuccess,
  EditCountryFail,
} from "../Slices/editCountrySlice";
import {
  fetchCountryPending,
  fetchCountrySuccess,
  fetchCountryFail,
} from "../Slices/fetchCountryDetailsSlice";
import {
  deleteCountryPending,
  deleteCountrySuccess,
  deleteCountryFail,
} from "../Slices/deleteCountrySlice";

//====CREATING NEW COUNTRY====//
export const createNewCountry = (
  name,
  title,
  description,
  countrySummary,
  specialist,
  selectedImage,
  slug,
  key_words
) => {
  return async (dispatch) => {
    dispatch(NewCountryPending());
    const data = new FormData();
    data.append("name", name);
    data.append("summary", countrySummary);
    data.append("description", description);
    data.append("specialist", specialist);
    data.append("title", title);
    data.append("file", selectedImage);
    data.append("slug", slug);
    data.append("key_words", key_words);

    const response = await fetch(`${baseUrl}/api/v1/countries/create`, {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch(NewCountryFail(error));
    }
    const res = await response.json();
    dispatch(NewCountrySuccess(res));
  };
};

//====FETCHING ALL COUNTRIES====//
export const fetchAllCountrys = () => async (dispatch) => {
  dispatch(fetchCountriesPending());
  try {
    const response = await fetch(`${baseUrl}/api/v1/countries/getAllCountries`);
    const fetchedCountries = await response.json();
    dispatch(fetchCountriesSuccess(fetchedCountries));
  } catch (error) {
    dispatch(fetchCountriesFail(error.message));
  }
};

//====FETCHING COUNTRY DETAILS====//
export const fetchCountryDetails = (country_id) => async (dispatch) => {
  dispatch(fetchCountryPending());
  try {
    const response = await fetch(`${baseUrl}/api/v1/countries/${country_id}`);
    const fetchedCountry = await response.json();
    dispatch(fetchCountrySuccess(fetchedCountry?.country));
  } catch (error) {
    dispatch(fetchCountryFail(error.message));
  }
};

//==== EDITING COUNTRY DETAILS====//

export const editCountryDetails = (
  name,
  title,
  description,
  countrySummary,
  specialist,
  selectedImage,
  slug,
  key_words,
  countryId
) => {
  return async (dispatch) => {
    dispatch(EditCountryPending());
    const data = new FormData();
    data.append("name", name);
    data.append("summary", countrySummary);
    data.append("description", description);
    data.append("specialist", specialist);
    data.append("title", title);
    data.append("file", selectedImage);
    data.append("slug", slug);
    data.append("key_words", key_words);

    const response = await fetch(
      `${baseUrl}/api/v1/countries/updateCountry/${countryId}`,
      {
        method: "PATCH",
        body: data,
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(EditCountryFail(error));
    }
    const res = await response.json();
    dispatch(EditCountrySuccess(res));
  };
};

//====DELETE COUNTRY====//
export const DeleteCountry = (countryId) => async (dispatch) => {
  dispatch(deleteCountryPending());
  try {
    const response = await fetch(
      `${baseUrl}/api/v1/countries/deleteCountry/${countryId}`,
      {
        method: "DELETE",
      }
    );
    const country = await response.json();
    dispatch(deleteCountrySuccess(country));
  } catch (error) {
    dispatch(deleteCountryFail(error));
  }
};
