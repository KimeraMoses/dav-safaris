import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  languagePosts: [],
  post: {},
  isLoading: false,
  isDeleting: false,
  language: false,
  status: "",
  message: "",
};
const postSlice = createSlice({
  name: "newPost",
  initialState,
  reducers: {
    getPostsLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
    setIsLanguage: (state, { payload }) => {
      state.language = payload;
    },
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
    fetchAllPostSuccess: (state, { payload }) => {
      state.posts = payload;
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
    getLanguagePosts: (state, { payload }) => {
      state.languagePosts = payload;
    },
  },
});

const { reducer, actions } = postSlice;

export const {
  NewPostPending,
  NewPostSuccess,
  NewPostFail,
  fetchAllPostSuccess,
  fetchPostPending,
  fetchPostSuccess,
  fetchPostFail,
  EditPostPending,
  EditPostSuccess,
  EditPostFail,
  deletePostPending,
  deletePostSuccess,
  deletePostFail,
  getLanguagePosts,
  getPostsLoading,
  setIsLanguage,
} = actions;
export default reducer;
