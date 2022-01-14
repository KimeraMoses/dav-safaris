import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    status: '',
    message: '',
  };
  const newTourSlice = createSlice({
    name: "newTour",
    initialState,
    reducers: {
      NewTourPending: (state) => {
        state.isLoading = true;
      },
      NewTourSuccess: (state, { payload }) => {
        state.isLoading = false;
        state.status = payload.status;
        state.message=payload.message;
      },
      NewTourFail: (state, { payload }) => {
        state.isLoading = false;
        state.status = payload.status;
        state.message =payload.message;
      },
      
    },
  });
  
  const { reducer, actions } = newTourSlice;
  
  export const { NewTourPending, NewTourSuccess, NewTourFail } = actions;
  export default reducer;