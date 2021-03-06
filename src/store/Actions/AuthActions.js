import { baseUrl } from "..";
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
import {
  UserRegistrationPending,
  UserRegistrationSuccess,
  UserRegistrationFail,
} from "../Slices/userRegistrationSlice";

export const login = (email, password) => {
  return async (dispatch) => {
    dispatch(authenticationPending());
    const response = await fetch(`${baseUrl}/api/v1/users/login`, {
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
  };
};

export const signup = (email, username, password) => {
  return async (dispatch) => {
    dispatch(UserRegistrationPending());
    const response = await fetch(`${baseUrl}/api/v1/users/signup`, {
      method: "POST",
      body: JSON.stringify({
        email,
        username,
        password,
      }),
      headers: new Headers({
        "Content-type": "application/json",
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      let message = "";
      if (error.message === "Email already exists") {
        message = "Account with the same email already exits";
      } else {
        message =
          "Failed to create account, Please check your connection and try again";
      }
      dispatch(UserRegistrationFail(message));
    }
    const data = await response.json();
    dispatch(UserRegistrationSuccess(data.status));
  };
};

export const updateProfile = (
  // course,
  email,
  first_name,
  image,
  last_name,
  phone_number,
  AuthToken
  // university,
  // password,
  // role,
) => {
  return async (dispatch) => {
    dispatch(updateProfilePending());
    const response = await fetch(`${baseUrl}/api/v1/users/updateMe`, {
      method: "PATCH",
      body: JSON.stringify({
        // course,
        email,
        first_name,
        image,
        last_name,
        phone_number,
        // university,
        // password,
        // role,
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
    const response = await fetch(`${baseUrl}/api/v1/users/forgotPassword`, {
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
export const RequestAccountVerification = (email) => {
  return async (dispatch) => {
    dispatch(requestVerificationPending());
    const response = await fetch(
      `${baseUrl}/api/v1/users/requestAccountVerification`,
      {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
        headers: new Headers({
          "Content-type": "application/json",
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      dispatch(requestVerificationFail(error));
    }
    const data = await response.json();
    dispatch(requestVerificationSuccess(data));
  };
};
export const VerifyAccount = (verificationToken) => {
  return async (dispatch) => {
    dispatch(verificationPending());
    const response = await fetch(
      `${baseUrl}/api/v1/users/verifyAccount/${verificationToken}`,
      {
        method: "PATCH",
      }
    );

    if (!response.ok) {
      const error = await response.json();
      dispatch(verificationFail(error));
    }
    const data = await response.json();
    dispatch(
      verificationSuccess({
        data,
        user: data.user,
        token: data.token,
      })
    );
    SaveTokenInLocalStorage(dispatch, data);
  };
};
export const passwordReset = (password, pwdResetToken) => {
  return async (dispatch) => {
    dispatch(UpdatePasswordPending());
    const response = await fetch(
      `${baseUrl}/api/v1/users/resetPassword/${pwdResetToken}`,
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

// export const validateToken = (Token) => {
//   return async (dispatch) => {
//     // dispatch(validateTokenPending())
//     const response = await fetch(`${baseUrl}/api/v1/users/validate`, {
//       method: "GET",
//       headers: new Headers({
//         Authorization: "Bearer " + Token,
//       }),
//     });
//     if (!response.ok) {
//       const error = await response.json();
//       // dispatch(logout());
//       // console.log("auto auth", error);
//     }
//     const data = await response.json();
//     // console.log("auto auth", data);
//     // dispatch(autoAuthenticationSuccess(CurrentUser));
//   };
// };

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

export const AutoAuthenticate = (dispatch, history) => {
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
