import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tourDetails: {},
  isLoading: false,
  error: "",
};
const tourSlice = createSlice({
  name: "tourDetails",
  initialState,
  reducers: {
    fetchTourPending: (state) => {
      state.isLoading = true;
    },
    fetchTourSuccess: (state, action) => {
      state.tourDetails = action.payload;
      state.isLoading = false;
    },
    fetchTourFail: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    
  },
});

const { reducer, actions } = tourSlice;

export const { fetchTourPending, fetchTourSuccess, fetchTourFail } = actions;
export default reducer;
