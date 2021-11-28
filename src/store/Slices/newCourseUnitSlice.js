import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    status: "",
    message: "",
  };
  const newCourseUnitSlice = createSlice({
    name: "newCourseUnit",
    initialState,
    reducers: {
      NewCourseUnitPending: (state) => {
        state.isLoading = true;
      },
      NewCourseUnitSuccess: (state, { payload }) => {
        state.status = payload.status;
        state.message=payload.message;
      },
      NewCourseUnitFail: (state, { payload }) => {
        state.isLoading = false;
        state.status = payload.status;
        state.message =payload.message;
      },
      
    },
  });
  
  const { reducer, actions } = newCourseUnitSlice;
  
  export const { NewCourseUnitPending, NewCourseUnitSuccess, NewCourseUnitFail } = actions;
  export default reducer;