import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  editTaskId: null,
};

const editSlice = createSlice({
  name: "editTaskId",
  initialState,
  reducers: {
    startEdit: (state, action) => {
      state.editTaskId = action.payload;
    },
    stopEdit: (state) => {
      state.editTaskId = null;
    },
  },
  selectors: {
    selectEditTaskId: (state) => state.editTaskId,
  },
});

export const { startEdit, stopEdit } = editSlice.actions;
export default editSlice.reducer;
export const { selectEditTaskId } = editSlice.selectors;
