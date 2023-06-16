import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryDetails: {},
  isLoading: false,
  message: "",
  error: "",
};
const fetchCategorySlice = createSlice({
  name: "categoryDetails",
  initialState,
  reducers: {
    fetchCategoryPending: (state) => {
      state.isLoading = true;
    },
    fetchCategorySuccess: (state, action) => {
      state.categoryDetails = action.payload;
      state.isLoading = false;
    },
    fetchCategoryFail: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = fetchCategorySlice;

//====SELECTING ALL COUNTRY  DETAILS STATES====//
export const selectCategoryDetails = (state) =>
  state.fetchCategory?.categoryDetails;
export const categoryFetchIsLoading = (state) => state.fetchCategory.isLoading;

export const { fetchCategoryPending, fetchCategorySuccess, fetchCategoryFail } =
  actions;
export default reducer;
