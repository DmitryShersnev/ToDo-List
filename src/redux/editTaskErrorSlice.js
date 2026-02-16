import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  errorTaskId: null,
};

const editTaskErrorSlice = createSlice({
  name: "editError",
  initialState,
  reducers: {
    setError: (state, action) => {
      state.errorTaskId = action.payload;
    },
    clearError: (state) => {
      state.errorTaskId = null;
    },
  },
});

export const { setError, clearError } = editTaskErrorSlice.actions;
export default editTaskErrorSlice.reducer;
