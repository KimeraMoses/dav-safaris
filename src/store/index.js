import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../store/Slices/uiSlice";
import userReducer from "../store/Slices/userSlice";
import userRegistrationReducer from "../store/Slices/userRegistrationSlice";
import authReducer from "./Slices/authSlice";
import passwordReducer from "./Slices/passwordSlice";
import tourReducer from "./Slices/tourSlice";
import toursReducer from "./Slices/toursSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    password: passwordReducer,
    users: userReducer,
    registration: userRegistrationReducer,
    tours: toursReducer,
    tour: tourReducer,
  },
});

export default store;
export const baseUrl = "https://davsafaris.herokuapp.com";
