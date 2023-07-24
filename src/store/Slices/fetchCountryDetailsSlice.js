import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countryDetails: {},
  isLoading: false,
  message: "",
  error: "",
};
const fetchCountrySlice = createSlice({
  name: "countryDetails",
  initialState,
  reducers: {
    fetchCountryPending: (state) => {
      state.isLoading = true;
    },
    fetchCountrySuccess: (state, action) => {
      state.countryDetails = action.payload;
      state.isLoading = false;
    },
    fetchCountryFail: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = fetchCountrySlice;

//====SELECTING ALL COUNTRY  DETAILS STATES====//
export const selectCountryDetails = (state) =>
  state.fetchCountry?.countryDetails;
export const countryFetchIsLoading = (state) => state.fetchCountry.isLoading;

export const { fetchCountryPending, fetchCountrySuccess, fetchCountryFail } =
  actions;
export default reducer;
