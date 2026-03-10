import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  errorTaskId: null,
};

const editTaskErrorSlice = createSlice({
  name: "errorTaskId",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.errorTaskId = action.payload;
    },
    clearError: (state) => {
      state.errorTaskId = null;
    },
  },
  selectors: {
    selectErrorTaskId: (state) => state.errorTaskId,
  },
});

export const { setError, clearError } = editTaskErrorSlice.actions;
export default editTaskErrorSlice.reducer;
export const { selectErrorTaskId } = editTaskErrorSlice.selectors;
