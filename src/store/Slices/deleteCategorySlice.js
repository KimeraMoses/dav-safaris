import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  status: "",
  message: "",
};
const deleteCategorySlice = createSlice({
  name: "deleteCategory",
  initialState,
  reducers: {
    deleteCategoryPending: (state) => {
      state.isLoading = true;
    },
    deleteCategorySuccess: (state, { payload }) => {
      state.message = payload.message;
      state.status = payload.status;
      state.isLoading = false;
    },
    deleteCategoryFail: (state, { payload }) => {
      state.status = payload.status;
      state.message = payload.message;
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = deleteCategorySlice;

export const selectDeleteIsLoading = (state) => state.deleteCategory.isLoading;

export const {
  deleteCategoryPending,
  deleteCategorySuccess,
  deleteCategoryFail,
} = actions;
export default reducer;
