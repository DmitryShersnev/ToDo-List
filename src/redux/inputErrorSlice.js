import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  inputError: false,
};

const inputErrorSlice = createSlice({
  name: "inputError",
  initialState,
  reducers: {
    setInputError: (state) => {
      state.inputError = true;
    },
    clearInputError: (state) => {
      state.inputError = false;
    },
  },
});

export const { setInputError, clearInputError } = inputErrorSlice.actions;
export default inputErrorSlice.reducer;
