import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../store/Slices/uiSlice";
import userReducer from "../store/Slices/userSlice";
import userRegistrationReducer from "../store/Slices/userRegistrationSlice";
import authReducer from "./Slices/authSlice";
import passwordReducer from "./Slices/passwordSlice";
import newTourReducer from "./Slices/newTourSlice";
import tourReducer from "./Slices/tourSlice";
import countrySlice from "./Slices/countrySlice";
import toursReducer from "./Slices/toursSlice";
import reviewReducer from "./Slices/reviewSlice";
import editTourReducer from "./Slices/editTourSlice";
import messageReducer from "./Slices/messageSlice";
import postReducer from "./Slices/postSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    password: passwordReducer,
    users: userReducer,
    registration: userRegistrationReducer,
    tours: toursReducer,
    tour: tourReducer,
    reviews: reviewReducer,
    newTour: newTourReducer,
    editTour: editTourReducer,
    countries: countrySlice,
    message: messageReducer,
    post: postReducer,
  },
});

export default store;
export const baseUrl = "https://davsafaris.herokuapp.com"; // PROD VERSION
// export const baseUrl = "http://127.0.0.1:5000"; // DEV VERSION
// export const TRACKING_ID = "G-LJDPXC1D4T";
export const TRACKING_ID = "UA-221371729-1";

export const messageNotifications = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
