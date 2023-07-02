import { baseUrl } from "..";
import { DAV_ROLES } from "../../constants";
import {
  authenticationPending,
  authenticationSuccess,
  authenticationFail,
  updateProfilePending,
  updateProfileSuccess,
  updateProfileFail,
  logout,
  autoAuthenticationSuccess,
  verificationPending,
  verificationFail,
  verificationSuccess,
} from "../Slices/authSlice";
import {
  forgotPasswordFail,
  forgotPasswordPending,
  forgotPasswordSuccess,
  requestVerificationFail,
  requestVerificationPending,
  requestVerificationSuccess,
  UpdatePasswordFail,
  UpdatePasswordPending,
  UpdatePasswordSuccess,
} from "../Slices/passwordSlice";

export const login = (email, password, navigate) => {
  return async (dispatch) => {
    dispatch(authenticationPending());
    const response = await fetch(`${baseUrl}/users/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    });
    if (!response.ok) {
      const error = await response.json();
      let message = "";
      if (error.message === "invalid credentials") {
        message =
          "User not found, Please double check your credentials and try again";
      } else if (error.error.statusCode === 403) {
        message = "Please verify your account and try again";
      } else {
        message = "Failed to login, Please check your connection and try again";
      }
      dispatch(authenticationFail(message));
    }
    const data = await response.json();
    dispatch(
      authenticationSuccess({
        data,
        user: data.user,
        token: data.token,
      })
    );

    SaveTokenInLocalStorage(dispatch, data);
    if (data.user.role === DAV_ROLES.AGENT) {
      navigate("/dashboard/agent");
    } else {
      navigate("/dashboard/user");
    }
  };
};

/**
 * @name signup
 * @description This is a function that handles user registration
 * @param {object} data
 * @param {string} role
 * @returns {object} dispatch
 */
export const signup = async (data, role) => {
  const response = await fetch(
    `${baseUrl}/users/signup${
      role === DAV_ROLES.AGENT ? `?role=${DAV_ROLES.AGENT}` : ""
    }`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    }
  );

  return await response.json();
};

export const updateProfile = (
  email,
  first_name,
  image,
  last_name,
  phone_number,
  AuthToken
) => {
  return async (dispatch) => {
    dispatch(updateProfilePending());
    const response = await fetch(`${baseUrl}/users/updateMe`, {
      method: "PATCH",
      body: JSON.stringify({
        email,
        first_name,
        image,
        last_name,
        phone_number,
      }),
      headers: new Headers({
        "Content-type": "application/json",
        Authorization: "Bearer " + AuthToken,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      dispatch(updateProfileFail(error));
    }
    const data = await response.json();
    dispatch(updateProfileSuccess(data.status));
  };
};

export const forgotPassword = (email) => {
  return async (dispatch) => {
    dispatch(forgotPasswordPending());
    const response = await fetch(`${baseUrl}/users/forgotPassword`, {
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
      dispatch(forgotPasswordFail(error));
    }
    const data = await response.json();
    dispatch(forgotPasswordSuccess(data));
  };
};

export const passwordReset = (password, pwdResetToken) => {
  return async (dispatch) => {
    dispatch(UpdatePasswordPending());
    const response = await fetch(
      `${baseUrl}/users/resetPassword/${pwdResetToken}`,
      {
        method: "PATCH",
        body: JSON.stringify({
          password,
        }),
        headers: new Headers({
          "Content-type": "application/json",
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      dispatch(UpdatePasswordFail(error));
    }
    const data = await response.json();
    dispatch(UpdatePasswordSuccess(data));
  };
};

export const SaveTokenInLocalStorage = (dispatch, userDetails) => {
  logOutTimer(dispatch, userDetails.expiresIn);
  let AuthTokenDetails = {
    token: userDetails.token,
    expiresIn: userDetails.expiresIn,
    expirationtime: userDetails.expirationtime,
  };
  localStorage.setItem("AuthToken", JSON.stringify(AuthTokenDetails));
  localStorage.setItem("CurrentUser", JSON.stringify(userDetails.user));
};

export const logOutTimer = (dispatch, timer) => {
  setTimeout(() => {
    dispatch(logout());
  }, timer);
};

export const AutoAuthenticate = (dispatch) => {
  const AuthToken = localStorage.getItem("AuthToken");
  const CurrentUser = localStorage.getItem("CurrentUser");
  let UserToken = "";
  if (!AuthToken) {
    dispatch(logout());
    return;
  }
  UserToken = JSON.parse(AuthToken);
  let expireDate = new Date(UserToken.expirationtime);
  let todaysDate = new Date();
  if (todaysDate > expireDate) {
    return dispatch(logout());
  }
  let data = {
    token: UserToken.token,
    user: JSON.parse(CurrentUser),
  };
  // validateToken(UserToken)
  dispatch(autoAuthenticationSuccess(data));

  const timer = expireDate.getTime() - todaysDate.getTime();
  logOutTimer(dispatch, timer);
};
