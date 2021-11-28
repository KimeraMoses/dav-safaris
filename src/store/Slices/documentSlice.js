import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  documentDetails: {},
  isLoading: false,
  error: "",
};
const documentSlice = createSlice({
  name: "documentDetails",
  initialState,
  reducers: {
    fetchDocumentPending: (state) => {
      state.isLoading = true;
    },
    fetchDocumentSuccess: (state, action) => {
      state.documentDetails = action.payload;
      state.isLoading = false;
    },
    fetchDocumentFail: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    
  },
});

const { reducer, actions } = documentSlice;

export const { fetchDocumentPending, fetchDocumentSuccess, fetchDocumentFail } = actions;
export default reducer;
