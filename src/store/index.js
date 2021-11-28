import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../store/Slices/themeSlice";
import uiReducer from "../store/Slices/uiSlice";
import userReducer from "../store/Slices/userSlice";
import userRegistrationReducer from "../store/Slices/userRegistrationSlice";
import authReducer  from "./Slices/authSlice";
import passwordReducer from "./Slices/passwordSlice";


const store = configureStore({
  reducer: { 
      theme: themeReducer,
      ui: uiReducer,
      auth:authReducer,
      password: passwordReducer,
      users: userReducer,
      registration: userRegistrationReducer,

    },
});

export default store;
export const baseUrl = "https://gpa-elevator.herokuapp.com";



