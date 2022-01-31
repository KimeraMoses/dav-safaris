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
    fetchPostPending: (state)=>{
      state.isLoading =true;
    },
    fetchPostSuccess:(state, {payload})=>{
      state.post = payload;
    },
    fetchPostFail: (state, {payload})=>{
      state.status = payload;
    }
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
  fetchPostFail

} = actions;
export default reducer;
