import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseDetails: {},
  isLoading: false,
  message: "",
  status: ""
};
const courseSlice = createSlice({
  name: "courseSlice",
  initialState,
  reducers: {
    fetchCourseDetailsLoading: (state) => {
      state.isLoading = true;
    },
    fetchCourseDetailsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.courseDetails = payload;
    },
    fetchCourseDetailsFail: (state, { payload }) => {
      state.isLoading = false;
      state.courseDetails = payload;
      state.message = payload.message;
    }
  },
});

const { reducer, actions } = courseSlice;

export const {
  fetchCourseDetailsLoading,
  fetchCourseDetailsSuccess,
  fetchCourseDetailsFail,
} = actions;
export default reducer;
