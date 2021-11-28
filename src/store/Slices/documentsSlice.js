import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  documentList: [],
  CUDocuments: [],
  isLoading: false,
  status: "",
  message: "",
};
const documentSlice = createSlice({
  name: "documentList",
  initialState,
  reducers: {
    fetchDocumentsPending: (state) => {
      state.isLoading = true;
    },
    fetchDocumentsSuccess: (state, { payload }) => {
      state.documentList = payload.files;
      state.isLoading = false;
      state.status = payload.status;
      state.message = payload.message;
    },
    fetchDocumentsFail: (state, { payload }) => {
      state.status = payload.status;
      state.isLoading = false;
      state.message = payload.message;
    },
    fetchCUDocumentsPending: (state) => {
      state.isLoading = true;
    },
    fetchCUDocumentsSuccess: (state, { payload }) => {
      state.CUDocuments = payload.files;
      state.isLoading = false;
      state.status = payload.status;
      state.message = payload.message;
    },
    fetchCUDocumentsFail: (state, { payload }) => {
      state.status = payload.status;
      state.isLoading = false;
      state.message = payload.message;
    },
  },
});

const { reducer, actions } = documentSlice;

export const {
  fetchDocumentsPending,
  fetchDocumentsSuccess,
  fetchDocumentsFail,
  fetchCUDocumentsPending,
  fetchCUDocumentsSuccess,
  fetchCUDocumentsFail,
} = actions;
export default reducer;
