import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCourseCategory : "Degree",
  // activeCourseCategory: selectedCourseCategory,

};
const courseCategorySlice = createSlice({
  name: "coursecategory",
  initialState,
  reducers: {
    selectedCourseCategory__phd: (state) => {
      state.selectedCourseCategory ="Phd"
      // state.activeCourseCategory =
    },
    selectedCourseCategory__masters: (state) => {
      state.selectedCourseCategory ="Masters"
    },
    selectedCourseCategory__diploma: (state) => {
      state.selectedCourseCategory ="Diploma"
    },
    selectedCourseCategory__degree: (state) => {
      state.selectedCourseCategory = "Degree"
    },
    selectedCourseCategory__certificate: (state) => {
      state.selectedCourseCategory ="Certificate"
    }
   
  },
});

const { reducer, actions } = courseCategorySlice;

export const { selectedCourseCategory__phd, selectedCourseCategory__masters,selectedCourseCategory__degree, selectedCourseCategory__diploma, selectedCourseCategory__certificate } = actions;
export default reducer;
