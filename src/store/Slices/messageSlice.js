import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  subcribing: false,
  status: "",
  message: "",
};
const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    SendMessagePending: (state) => {
      state.isLoading = true;
    },
    SendMessageSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.status;
      state.message = payload.message;
    },
    SendMessageFail: (state, { payload }) => {
      state.isLoading = false;
      state.status = payload.status;
      state.message = payload.message;
    },
    NewsLetterPending: (state) => {
      state.subcribing = true;
    },
    NewsLetterSuccess: (state, { payload }) => {
      state.message = payload;
      state.subcribing = false;
    },
    NewsLetterFail: (state, { payload }) => {
      state.message = payload;
      state.subcribing = false;
    },
  },
});

const { reducer, actions } = messageSlice;

export const {
  SendMessagePending,
  SendMessageSuccess,
  SendMessageFail,
  NewsLetterPending,
  NewsLetterSuccess,
  NewsLetterFail,
} = actions;
export default reducer;
