import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  post: {},
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
      state.status = payload.status;
      state.message = payload.message;
    },
    EditPostFail: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.status;
      state.message = payload.message;
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
} = actions;
export default reducer;
