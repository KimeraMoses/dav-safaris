import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  status: "",
  message: "",
};
const deleteCountrySlice = createSlice({
  name: "deleteCountry",
  initialState,
  reducers: {
    deleteCountryPending: (state) => {
      state.isLoading = true;
    },
    deleteCountrySuccess: (state, { payload }) => {
      state.message = payload.message;
      state.status = payload.status;
      state.isLoading = false;
    },
    deleteCountryFail: (state, { payload }) => {
      state.status = payload.status;
      state.message = payload.message;
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = deleteCountrySlice;

export const selectDeleteIsLoading = (state) => state.deleteCountry.isLoading;

export const { deleteCountryPending, deleteCountrySuccess, deleteCountryFail } =
  actions;
export default reducer;
