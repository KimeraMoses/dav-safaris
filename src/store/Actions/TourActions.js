import { baseUrl } from "..";
import {
  fetchCountriesFail,
  fetchCountriesPending,
  fetchCountriesSuccess,
} from "../Slices/countrySlice";
import {
  deleteTourFail,
  deleteTourPending,
  deleteTourSuccess,
} from "../Slices/deleteTourSlice";
import {
  EditTourFail,
  EditTourPending,
  EditTourSuccess,
} from "../Slices/editTourSlice";
import {
  SendMessageFail,
  SendMessagePending,
  SendMessageSuccess,
} from "../Slices/messageSlice";
import {
  NewTourFail,
  NewTourPending,
  NewTourSuccess,
} from "../Slices/newTourSlice";

import {
  bookTourFail,
  bookTourPending,
  bookTourSuccess,
  fetchTourFail,
  fetchTourPending,
  fetchTourSuccess,
  reviewTourFail,
  reviewTourPending,
  reviewTourSuccess,
} from "../Slices/tourSlice";
import {
  fetchCountryToursFail,
  fetchCountryToursPending,
  fetchCountryToursSuccess,
  fetchToursFail,
  fetchToursPending,
  fetchToursSuccess,
} from "../Slices/toursSlice";

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
export const fetchAllCountries = () => async (dispatch) => {
  dispatch(fetchCountriesPending());
  try {
    const response = await fetch(`https://restcountries.com/v2/all`);
    const fetchedCountries = await response.json();
    dispatch(fetchCountriesSuccess(fetchedCountries));
  } catch (error) {
    dispatch(fetchCountriesFail(error.message));
  }
};

export const fetchAllCountryTours = (country) => async (dispatch) => {
  dispatch(fetchCountryToursPending());
  try {
    const response = await fetch(
      `${baseUrl}/api/v1/tours/getAllTours/${country}`
    );
    const fetchedTours = await response.json();
    dispatch(fetchCountryToursSuccess(fetchedTours.tours));
  } catch (error) {
    dispatch(fetchCountryToursFail(error.message));
  }
};

export const fetchTourDetails = (tour_id) => async (dispatch) => {
  dispatch(fetchTourPending());
  try {
    const response = await fetch(`${baseUrl}/api/v1/tours/${tour_id}`);
    const fetchedTour = await response.json();
    dispatch(fetchTourSuccess(fetchedTour.tour));
  } catch (error) {
    dispatch(fetchTourFail(error.message));
  }
};

export const fetchTourName = (tour_slug) => async (dispatch) => {
  dispatch(fetchTourPending());
  try {
    const response = await fetch(
      `${baseUrl}/api/v1/tours/getTourByName/${tour_slug}`
    );
    const fetchedTour = await response.json();
    dispatch(fetchTourSuccess(fetchedTour.tour));
  } catch (error) {
    dispatch(fetchTourFail(error.message));
  }
};

//====CREATING NEW TOUR====//
export const createNewTour = (
  name,
  description,
  tourActivities,
  dayActivityDescription,
  duration,
  price,
  file,
  packageDetails,
  category,
  country,
  key_words
) => {
  return async (dispatch) => {
    dispatch(NewTourPending());
    const data = new FormData();
    data.append("file", file);
    data.append("category", category);
    data.append("name", name);
    data.append("description", description);
    data.append("tourActivities", tourActivities);
    data.append("packageDetails", packageDetails);
    data.append("country", country);
    data.append("price", price);
    data.append("duration", duration);
    data.append("dayActivityDescription", dayActivityDescription);
    data.append("key_words", key_words);
    const response = await fetch(`${baseUrl}/api/v1/tours/create`, {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch(NewTourFail(error));
    }
    const res = await response.json();
    dispatch(NewTourSuccess(res));
  };
};
//====END====//

//====EDITING TOUR DETAILS====//
export const editTourDetails = (
  name,
  description,
  tourActivities,
  dayActivityDescription,
  duration,
  price,
  file,
  packageDetails,
  category,
  country,
  key_words,
  tourId
) => {
  return async (dispatch) => {
    dispatch(EditTourPending());

    const data = new FormData();
    data.append("file", file);
    data.append("category", category);
    data.append("name", name);
    data.append("description", description);
    data.append("tourActivities", tourActivities);
    data.append("packageDetails", packageDetails);
    data.append("country", country);
    data.append("price", price);
    data.append("duration", duration);
    data.append("dayActivityDescription", dayActivityDescription);
    data.append("key_words", key_words);

    const response = await fetch(
      `${baseUrl}/api/v1/tours/updateTour/${tourId}`,
      {
        method: "PATCH",
        body: data,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      dispatch(EditTourFail(error));
    }
    const res = await response.json();
    dispatch(EditTourSuccess(res));
  };
};
//====END====//

//====DELETE TOUR FROM DB====//
export const DeleteTour = (tourId) => async (dispatch) => {
  dispatch(deleteTourPending());
  try {
    const response = await fetch(
      `${baseUrl}/api/v1/tours/deleteTour/${tourId}`,
      {
        method: "DELETE",
      }
    );
    const Tour = await response.json();
    dispatch(deleteTourSuccess(Tour));
  } catch (error) {
    dispatch(deleteTourFail(error));
  }
};
//====END====//

export const BookTour = (
  tour,
  user_name,
  country_of_residence,
  phone,
  email,
  travellers,
  travel_plans,
  budget
) => {
  return async (dispatch) => {
    dispatch(bookTourPending());
    const response = await fetch(`${baseUrl}/api/v1/bookings/create`, {
      method: "POST",

      body: JSON.stringify({
        tour,
        user_name,
        country_of_residence,
        phone,
        email,
        travellers,
        travel_plans,
        budget,
      }),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch(bookTourFail(error));
    }
    const data = await response.json();
    dispatch(bookTourSuccess(data));
  };
};

export const ReviewTour = (
  tour,
  review,
  rating,
  user_name,
  country_of_residence,
  visit_month,
  visit_year,
  email
) => {
  return async (dispatch) => {
    dispatch(reviewTourPending());
    const response = await fetch(`${baseUrl}/api/v1/reviews/create`, {
      method: "POST",
      body: JSON.stringify({
        tour,
        review,
        rating,
        user_name,
        country_of_residence,
        visit_month,
        visit_year,
        email,
      }),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    });

    if (!response.ok) {
      const error = await response.json();

      dispatch(reviewTourFail(error));
    }
    const data = await response.json();
    dispatch(reviewTourSuccess(data));
  };
};

export const chatWithUs = (
  name,
  email,
  phone,
  message,
  travellers,
  is_add_to_news_letter
) => {
  return async (dispatch) => {
    dispatch(SendMessagePending());
    const response = await fetch(`${baseUrl}/api/v1/subscribers/create`, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
        travellers,
        is_add_to_news_letter,
      }),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch(SendMessageFail(error));
    }
    const data = await response.json();
    dispatch(SendMessageSuccess(data));
  };
};
export const contactUs = (name, email, contact, message) => {
  return async (dispatch) => {
    dispatch(SendMessagePending());
    const response = await fetch(`${baseUrl}/api/v1/subscribers/contactUs`, {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        contact,
        message,
      }),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch(SendMessageFail(error));
    }
    const data = await response.json();
    dispatch(SendMessageSuccess(data));
  };
};
