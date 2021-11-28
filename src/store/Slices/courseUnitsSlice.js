import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseUnitList: [],
  courseCourseUnits: [],
  isLoading: false,
  newLoading: false,
  message: "",
  status: "",
};
const courseUnitSlice = createSlice({
  name: "courseUnitList",
  initialState,
  reducers: {
    NewCourseUnitPending: (state) => {
      state.newLoading = true;
    },
    NewCourseUnitSuccess: (state, { payload }) => {
      state.status = payload.status;
      state.message = payload.message;
      state.newLoading = false;
    },
    NewCourseUnitFail: (state, { payload }) => {
      state.newLoading = false;
      state.status = payload.status;
      state.message = payload.message;
    },
    fetchCourseUnitsPending: (state) => {
      state.isLoading = true;
    },
    fetchCourseUnitsSuccess: (state, { payload }) => {
      state.courseUnitList = payload;
      state.isLoading = false;
      state.status = payload.status;
      state.message = payload.message;
    },
    fetchCourseUnitsFail: (state, { payload }) => {
      state.status = payload.status;
      state.message = payload.message;
      state.isLoading = false;
    },
    fetchCourseCourseUnitsPending: (state) => {
      state.isLoading = true;
    },
    fetchCourseCourseUnitsSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.courseCourseUnits = payload;
    },
    fetchCourseCourseUnitsFail: (state, { payload }) => {
      state.status = payload.status;
      state.message = payload.message;
      state.isLoading = false;
    }
  },
});

const { reducer, actions } = courseUnitSlice;

export const {
  NewCourseUnitPending,
  NewCourseUnitSuccess,
  NewCourseUnitFail,
  fetchCourseUnitsPending,
  fetchCourseUnitsSuccess,
  fetchCourseUnitsFail,
  fetchCourseCourseUnitsPending,
  fetchCourseCourseUnitsSuccess,
  fetchCourseCourseUnitsFail,
} = actions;
export default reducer;
