import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
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
  },
});

const { reducer, actions } = messageSlice;

export const { SendMessagePending, SendMessageSuccess, SendMessageFail } =
  actions;
export default reducer;
