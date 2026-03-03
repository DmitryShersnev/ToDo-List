import { configureStore, combineReducers } from "@reduxjs/toolkit";

import inputTextReducer from "./inputTextSlice";
import inputErrorReducer from "./inputErrorSlice";
import tasksReducer from "./tasksSlice";
import filterReducer from "./filterSlice";
import editReducer from "./editSlice";
import editTaskErrorReducer from "./editTaskErrorSlice";
import editTextReducer from "./editTextSlice";
import regLogReducer from "./regLogSlice";

const store = configureStore({
  reducer: combineReducers({
    inputText: inputTextReducer,
    tasks: tasksReducer,
    inputError: inputErrorReducer,
    filter: filterReducer,
    editTaskId: editReducer,
    errorTaskId: editTaskErrorReducer,
    editText: editTextReducer,
  }),
});
export default store;
