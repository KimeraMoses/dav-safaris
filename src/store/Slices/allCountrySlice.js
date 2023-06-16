import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  status: "",
  message: "",
};
const newCountrySlice = createSlice({
  name: "newCountry",
  initialState,
  reducers: {
    NewCountryPending: (state) => {
      state.isLoading = true;
    },
    NewCountrySuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.status;
      state.message = payload.message;
    },
    NewCountryFail: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.status;
      state.message = payload.message;
    },
  },
});
const { reducer, actions } = newCountrySlice;

export const { NewCountryPending, NewCountrySuccess, NewCountryFail } = actions;
export default reducer;
