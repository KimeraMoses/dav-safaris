import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseUnitDetails: {},
  isLoading: false,
  error: "",
};
const courseUnitSlice = createSlice({
  name: "courseUnitDetails",
  initialState,
  reducers: {
    fetchCourseUnitPending: (state) => {
      state.isLoading = true;
    },
    fetchCourseUnitSuccess: (state, action) => {
      state.courseUnitDetails = action.payload;
      state.isLoading = false;
    },
    fetchCourseUnitFail: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    
  },
});

const { reducer, actions } = courseUnitSlice;

export const { fetchCourseUnitPending, fetchCourseUnitSuccess, fetchCourseUnitFail } = actions;
export default reducer;
