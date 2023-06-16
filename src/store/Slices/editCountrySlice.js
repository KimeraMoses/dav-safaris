import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  status: "",
  message: "",
};
const editCountrySlice = createSlice({
  name: "editCountry",
  initialState,
  reducers: {
    EditCountryPending: (state) => {
      state.isLoading = true;
    },
    EditCountrySuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.status;
      state.message = payload.message;
    },
    EditCountryFail: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.status;
      state.message = payload.message;
    },
  },
});

const { reducer, actions } = editCountrySlice;

//====SELECTING ALL EDIT COUNTRY STATES====//
export const countryEditIsLoading = (state) => state.editCountry.isLoading;
export const countryEditStatus = (state) => state.editCountry.status;
export const countryEditMessage = (state) => state.editCountry.message;

export const { EditCountryPending, EditCountrySuccess, EditCountryFail } =
  actions;
export default reducer;
