import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: crypto.randomUUID(),
        title: action.payload,
        isDone: false,
      });
    },
    changeStatusCheckbox: (state, action) => {
      state.tasks = state.tasks.map((item) =>
        item.id === action.payload ? { ...item, isDone: !item.isDone } : item,
      );
    },
    deleteTaskAc: (state, action) => {
      state.tasks = state.tasks.filter((item) => item.id !== action.payload);
    },
    clearDoneTasks: (state) => {
      state.tasks = state.tasks.filter((item) => item.isDone === false);
    },
    addNewTask: (state, action) => {
      const { id, newTitle } = action.payload;
      state.tasks = state.tasks.map((item) =>
        item.id === id ? { ...item, title: newTitle } : item,
      );
    },
  },
});

export const {
  addTask,
  changeStatusCheckbox,
  deleteTaskAc,
  clearDoneTasks,
  addNewTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
