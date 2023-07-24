import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  status: "",
  message: "",
};
const editCategorySlice = createSlice({
  name: "editCategory",
  initialState,
  reducers: {
    EditCategoryPending: (state) => {
      state.isLoading = true;
    },
    EditCategorySuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.status;
      state.message = payload.message;
    },
    EditCategoryFail: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.status;
      state.message = payload.message;
    },
  },
});

const { reducer, actions } = editCategorySlice;

//====SELECTING ALL EDIT COUNTRY STATES====//
export const categoryEditIsLoading = (state) => state.editCategory.isLoading;
export const categoryEditStatus = (state) => state.editCategory.status;
export const categoryEditMessage = (state) => state.editCategory.message;

export const { EditCategoryPending, EditCategorySuccess, EditCategoryFail } =
  actions;
export default reducer;
