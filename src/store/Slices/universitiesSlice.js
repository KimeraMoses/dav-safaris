import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  universityList: [],
  isLoading: false,
  error: "",
};
const universitiesSlice = createSlice({
  name: "universityList",
  initialState,
  reducers: {
    fetchUniversitiesLoading: (state) => {
      state.isLoading = true;
    },
    fetchUniversitiesSuccess: (state, action) => {
      state.universityList = action.payload;
      state.isLoading = false;
    },
    fetchUniversitiesFail: (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    },
    
  },
});

const { reducer, actions } = universitiesSlice;

export const { fetchUniversitiesLoading, fetchUniversitiesSuccess, fetchUniversitiesFail } = actions;
export default reducer;
