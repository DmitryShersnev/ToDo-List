import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  filter: "all",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    all: (state) => {
      state.filter = "all";
    },
    active: (state) => {
      state.filter = "active";
    },
    done: (state) => {
      state.filter = "done";
    },
  },
});

export const { all, active, done } = filterSlice.actions;
export default filterSlice.reducer;
