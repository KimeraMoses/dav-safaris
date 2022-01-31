import {
  fetchUsersLoading,
  fetchUsersSuccess,
  fetchUsersFail,
  fetchUserpending,
  fetchUserSuccess,
  fetchUserFail,
} from "../Slices/userSlice";

import { baseUrl } from "..";
import { NewsLetterFail, NewsLetterPending, NewsLetterSuccess } from "../Slices/messageSlice";

export const fetchUsers = (AuthToken) => {
  return async (dispatch) => {
    dispatch(fetchUsersLoading());
    try {
      const response = await fetch(`${baseUrl}/api/v1/users/`, {
        method: "GET",
        headers: new Headers({
          "Content-type": "application/json",
          Authorization: "Bearer " + AuthToken,
        }),
    });
    const data = await response.json();

      dispatch(fetchUsersSuccess(data));
    } catch(error) {
        dispatch(fetchUsersFail(error));
    }
  };
};

export const fetchUserDetails = (uni_id) => async (dispatch) => {
  dispatch(fetchUserpending());
  try {
    const response = await fetch(`${baseUrl}/api/v1/users/${uni_id}`);
    const fetchedUser = await response.json();
      dispatch(fetchUserSuccess(fetchedUser));
  } catch (error) {
    dispatch(fetchUserFail(error.message));
  }
};


export const NewsLetters = (
  email,
) => {
  return async (dispatch) => {
    dispatch(NewsLetterPending());
    const response = await fetch(`${baseUrl}/api/v1/subscribers/joinNewsLetter`, {
      method: "POST",
      body: JSON.stringify({
        email,
      }),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      let message = ""
      if(error.message.includes("Duplicate")){
        message = "Email already subscribed to NewsLetter"
      }else{
        message = "Failed to subscribe to Newsletter, Please check your connection and try again"
      }
      dispatch(NewsLetterFail(message));
      console.log(error)
    }
    const data = await response.json();
    dispatch(NewsLetterSuccess(data.status));
    console.log(data)
  };
};

