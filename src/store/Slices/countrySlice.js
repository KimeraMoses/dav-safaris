import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countryList: [],
  isLoading: false,
  error: "",
};
const countrySlice = createSlice({
  name: "countryList",
  initialState,
  reducers: {
    fetchCountriesPending: (state) => {
      state.isLoading = true;
    },
    fetchCountriesSuccess: (state, action) => {
      state.countryList = action.payload;
      state.isLoading = false;
    },
    fetchCountriesFail: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = countrySlice;

//====SELECTING ALL COUNTRY STATES====//
export const selectAllCountries = (state) => state.countries.countryList;
export const selectIsLoading = (state) => state.countries.isLoading;
export const selectError = (state) => state.countries.error;

export const {
  fetchCountriesPending,
  fetchCountriesSuccess,
  fetchCountriesFail,
} = actions;
export default reducer;
