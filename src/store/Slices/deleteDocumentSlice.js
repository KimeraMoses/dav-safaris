import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  status: "",
  message: "",
};
const deleteDocumentSlice = createSlice({
  name: "deleteDocument",
  initialState,
  reducers: {
    deleteDocumentPending: (state) => {
      state.isLoading = true;
    },
    deleteDocumentSuccess: (state, {payload}) => {
      state.message = payload.message;
      state.status = payload.status;
      state.isLoading = false;
    },
    deleteDocumentFail: (state, { payload }) => {
      state.status = payload.status;
      state.message = payload.message;
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = deleteDocumentSlice;

export const { deleteDocumentPending, deleteDocumentSuccess, deleteDocumentFail } =
  actions;
export default reducer;
