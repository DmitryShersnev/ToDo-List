import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  editTaskId: null,
};

const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    startEdit: (state, action) => {
      state.editTaskId = action.payload;
    },
    stopEdit: (state) => {
      state.editTaskId = null;
    },
  },
});

export const { startEdit, stopEdit } = editSlice.actions;
export default editSlice.reducer;
