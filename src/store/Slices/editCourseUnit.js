import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  message: "",
  status: ""
};
const editCourseUnitSlice = createSlice({
  name: "editcourseunitSlice",
  initialState,
  reducers: {
    EditCourseUnitPending: (state) => {
      state.isLoading = true;
    },
    EditCourseUnitSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.status;
      state.message = payload.message;
    },
    EditCourseUnitFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload.message;
      state.status = payload.status;
    },
  },
});

const { reducer, actions } = editCourseUnitSlice;

export const {
  EditCourseUnitPending,
  EditCourseUnitSuccess,
  EditCourseUnitFail
} = actions;
export default reducer;
