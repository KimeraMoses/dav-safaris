import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    status: "",
    message: "",
  };
  const newCourseSlice = createSlice({
    name: "newCourse",
    initialState,
    reducers: {
      NewCoursePending: (state) => {
        state.isLoading = true;
      },
      NewCourseSuccess: (state, { payload }) => {
        state.isLoading = false;
        state.status = payload.status;
        state.message =payload.message;
      },
      NewCourseFail: (state, { payload }) => {
        state.isLoading = false;
        state.status = payload.status;
        state.message =payload.message;
      },
      
    },
  });
  
  const { reducer, actions } = newCourseSlice;
  
  export const { NewCoursePending, NewCourseSuccess, NewCourseFail } = actions;
  export default reducer;