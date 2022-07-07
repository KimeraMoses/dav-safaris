import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  post: {},
  isLoading: false,
  isDeleting: false,
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
    fetchPostPending: (state) => {
      state.isLoading = true;
    },
    fetchPostSuccess: (state, { payload }) => {
      state.post = payload;
      state.isLoading = false;
    },
    fetchPostFail: (state, { payload }) => {
      state.status = payload;
      state.isLoading = false;
    },
    EditPostPending: (state) => {
      state.isLoading = true;
    },
    EditPostSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload?.status;
      state.message = payload?.message;
    },
    EditPostFail: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload?.status;
      state.message = payload?.message;
    },
    deletePostPending: (state) => {
      state.isDeleting = true;
    },
    deletePostSuccess: (state, { payload }) => {
      state.message = payload?.message;
      state.status = payload?.status;
      state.isDeleting = false;
    },
    deletePostFail: (state, { payload }) => {
      state.status = payload?.status;
      state.message = payload?.message;
      state.isDeleting = false;
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
  fetchPostPending,
  fetchPostSuccess,
  fetchPostFail,
  EditPostPending,
  EditPostSuccess,
  EditPostFail,
  deletePostPending,
  deletePostSuccess,
  deletePostFail,
} = actions;
export default reducer;
