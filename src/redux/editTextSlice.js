import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  editText: "",
};

const editTextSlice = createSlice({
  name: "editText",
  initialState,
  reducers: {
    initEditText: (state, action) => {
      state.editText = action.payload;
    },
    changeEditText: (state, action) => {
      state.editText = action.payload;
    },
  },
  selectors: {
    selectEditText: (state) => state.editText,
  },
});

export const { initEditText, changeEditText } = editTextSlice.actions;
export default editTextSlice.reducer;
export const { selectEditText } = editTextSlice.selectors;
