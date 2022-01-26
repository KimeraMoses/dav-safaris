import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Reviews: {},
  isLoading: false,
  message: "",
  error: "",
};
const reviewSlice = createSlice({
  name: "tourReviews",
  initialState,
  reducers: {
    fetchTourReviewsPending: (state) => {
      state.isLoading = true;
    },
    fetchTourReviewsSuccess: (state, action) => {
      state.Reviews = action.payload;
      state.isLoading = false;
    },
    fetchTourReviewsFail: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = reviewSlice;

export const {
  fetchTourReviewsPending,
  fetchTourReviewsSuccess,
  fetchTourReviewsFail,
} = actions;
export default reducer;
