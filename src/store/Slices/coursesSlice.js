import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseList: [],
  isLoading: false,
  error: "",
  status: ""
};
const coursesSlice = createSlice({
  name: "coursesSlice",
  initialState,
  reducers: {
    fetchCoursesLoading: (state) => {
      state.isLoading = true;
    },
    fetchCoursesSuccess: (state, action) => {
      state.courseList = action.payload;
      state.isLoading = false;
    },

    fetchCoursesFail: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    }
  },
});

const { reducer, actions } = coursesSlice;

export const {
  fetchCoursesLoading,
  fetchCoursesSuccess,
  fetchCoursesFail,
} = actions;
export default reducer;
