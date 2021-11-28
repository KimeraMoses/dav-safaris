import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItem: {},
  isLoading: false,
};
const selectedSlice = createSlice({
  name: "selectedItems",
  initialState,
  reducers: {
    setSelectedItemLoading: (state) => {
      state.isLoading = true;
    },
    setSelectedItemSuccess: (state, action) => {
      state.selectedItem = action.payload;
      state.isLoading = false;
    },
    // setSelectedItemFail: (state, { payload }) => {
    //   state.error = payload;
    //   state.isLoading = false;
    // },
    
  },
});

const { reducer, actions } = selectedSlice;

export const { setSelectedItemLoading, setSelectedItemSuccess } = actions;
export default reducer;