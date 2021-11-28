import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  message: "",
  status: ""
};
const editCourseSlice = createSlice({
  name: "editcourseSlice",
  initialState,
  reducers: {
    EditCoursePending: (state) => {
      state.isLoading = true;
    },
    EditCourseSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.status;
      state.message = payload.message;
    },
    EditCourseFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload.message;
      state.status = payload.status;
    },
  },
});

const { reducer, actions } = editCourseSlice;

export const {
  EditCoursePending,
  EditCourseSuccess,
  EditCourseFail
} = actions;
export default reducer;
