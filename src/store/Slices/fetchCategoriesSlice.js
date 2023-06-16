import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryList: [],
  isLoading: false,
  error: "",
};
const categoriesSlice = createSlice({
  name: "categoryList",
  initialState,
  reducers: {
    fetchCategoriesPending: (state) => {
      state.isLoading = true;
    },
    fetchCategoriesSuccess: (state, action) => {
      state.categoryList = action.payload;
      state.isLoading = false;
    },
    fetchCategoriesFail: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
  },
});

const { reducer, actions } = categoriesSlice;

//====SELECTING ALL CATEGORY STATES====//
export const selectAllCategories = (state) =>
  state.fetchAllCategories.categoryList;
export const selectCategoriesFetchIsLoading = (state) =>
  state.fetchAllCategories.isLoading;
export const selectCategoriesFetchError = (state) =>
  state.fetchAllCategories.error;

export const {
  fetchCategoriesPending,
  fetchCategoriesSuccess,
  fetchCategoriesFail,
} = actions;
export default reducer;
