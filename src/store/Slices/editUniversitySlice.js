import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    status: null,
  };
  const editUniversitySlice = createSlice({
    name: "editUniversity",
    initialState,
    reducers: {
      EditUnversityPending: (state) => {
        state.isLoading = true;
      },
      EditUnversitySuccess: (state, { payload }) => {
        state.isLoading = false;
        state.status = payload;
      },
      EditUnversityFail: (state, { payload }) => {
        state.isLoading = false;
        state.status = payload;
      },
      
    },
  });
  
  const { reducer, actions } = editUniversitySlice;
  
  export const { EditUnversityPending, EditUnversitySuccess, EditUnversityFail } = actions;
  export default reducer;