import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  inputText: "",
};

const inputTextSlice = createSlice({
  name: "inputText",
  initialState,
  reducers: {
    change: (state, action) => {
      state.inputText = action.payload;
    },
    clearInput: (state) => {
      state.inputText = "";
    },
  },
});

export const { change, clearInput } = inputTextSlice.actions;
export default inputTextSlice.reducer;
