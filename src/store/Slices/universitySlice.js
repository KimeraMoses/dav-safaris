import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  universityDetails: {},
  isLoading: false,
  error: "",
};
const universitySlice = createSlice({
  name: "universityDetails",
  initialState,
  reducers: {
    fetchUniversitypending: (state) => {
      state.isLoading = true;
    },
    fetchUniversitySuccess: (state, action) => {
      state.universityDetails = action.payload;
      state.isLoading = false;
    },
    fetchUniversityFail: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    
  },
});

const { reducer, actions } = universitySlice;

export const { fetchUniversitypending, fetchUniversitySuccess, fetchUniversityFail } = actions;
export default reducer;
