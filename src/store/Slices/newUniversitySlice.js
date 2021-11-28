import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    status: '',
    message: '',
  };
  const newUniversitySlice = createSlice({
    name: "newUniversity",
    initialState,
    reducers: {
      NewUnversityPending: (state) => {
        state.isLoading = true;
      },
      NewUnversitySuccess: (state, { payload }) => {
        state.isLoading = false;
        state.status = payload.status;
        state.message=payload.message;
      },
      NewUnversityFail: (state, { payload }) => {
        state.isLoading = false;
        state.status = payload.status;
        state.message =payload.message;
      },
      
    },
  });
  
  const { reducer, actions } = newUniversitySlice;
  
  export const { NewUnversityPending, NewUnversitySuccess, NewUnversityFail } = actions;
  export default reducer;