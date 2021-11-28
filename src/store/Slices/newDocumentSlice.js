import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    status: '',
    message: '',
  };
  const newDocumentSlice = createSlice({
    name: "newdocument",
    initialState,
    reducers: {
      NewDocumentPending: (state) => {
        state.isLoading = true;
      },
      NewDocumentSuccess: (state, { payload }) => {
        state.isLoading = false;
        state.status = payload.status;
        state.message=payload.message;
      },
      NewDocumentFail: (state, { payload }) => {
        state.isLoading = false;
        state.status = payload.status;
        state.message =payload.message;
      },
      
    },
  });
  
  const { reducer, actions } = newDocumentSlice;
  
  export const { NewDocumentPending, NewDocumentSuccess, NewDocumentFail } = actions;
  export default reducer;