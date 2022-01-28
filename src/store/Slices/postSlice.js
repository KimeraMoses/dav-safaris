import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  isLoading: false,
  status: "",
  message: "",
};
const postSlice = createSlice({
  name: "newPost",
  initialState,
  reducers: {
    NewPostPending: (state) => {
      state.isLoading = true;
    },
    NewPostSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.status;
      state.message = payload.message;
    },
    NewPostFail: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.status;
      state.message = payload.message;
    },
    fetchAllPostPending: (state) => {
      state.isLoading = true;
    },
    fetchAllPostSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.posts = payload;
    },
    fetchAllPostFail: (state, { payload }) => {
      state.isLoading = false;
      state.message = payload;
    },
  },
});

const { reducer, actions } = postSlice;

export const {
  NewPostPending,
  NewPostSuccess,
  NewPostFail,
  fetchAllPostPending,
  fetchAllPostSuccess,
  fetchAllPostFail,
} = actions;
export default reducer;
