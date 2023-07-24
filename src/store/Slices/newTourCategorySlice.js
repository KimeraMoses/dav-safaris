import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  status: "",
  message: "",
};
const newCategorySlice = createSlice({
  name: "newCategory",
  initialState,
  reducers: {
    NewCategoryPending: (state) => {
      state.isLoading = true;
    },
    NewCategorySuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.status;
      state.message = payload.message;
    },
    NewCategoryFail: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.status;
      state.message = payload.message;
    },
  },
});
const { reducer, actions } = newCategorySlice;

export const { NewCategoryPending, NewCategorySuccess, NewCategoryFail } =
  actions;
export default reducer;
