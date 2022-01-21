import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tourDetails: {},
  isLoading: false,
  isBooking: false,
  message: "",
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
    bookTourPending: (state, { payload }) => {
      state.isBooking = true;
    },
    bookTourSuccess: (state, { payload }) => {
      state.isBooking = false;
      state.message = payload;
    },
    bookTourFail: (state, { payload }) => {
      state.isBooking = false;
      state.message = payload;
    },
  },
});

const { reducer, actions } = tourSlice;

export const {
  fetchTourPending,
  fetchTourSuccess,
  fetchTourFail,
  bookTourPending,
  bookTourSuccess,
  bookTourFail,
} = actions;
export default reducer;
