import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  status: "",
  message: "",
};
const enrollUserSlice = createSlice({
  name: "enrollUser",
  initialState,
  reducers: {
    EnrollUserPending: (state) => {
      state.isLoading = true;
    },
    EnrollUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.success;
      state.message = payload.message;
    },
    EnrollUserFail: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.status;
      state.message = payload.message;
    },
    DeregisterUserPending: (state) => {
      state.isLoading = true;
    },
    DeregisterUserSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.status;
      state.message = payload.message;
    },
    DeregisterUserFail: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.status;
      state.message = payload.message;
    },
  },
});

const { reducer, actions } = enrollUserSlice;

export const {
  EnrollUserPending,
  EnrollUserSuccess,
  EnrollUserFail,
  DeregisterUserPending,
  DeregisterUserSuccess,
  DeregisterUserFail,
} = actions;
export default reducer;
