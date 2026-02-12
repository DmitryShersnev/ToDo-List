import { legacy_createStore as createStore, combineReducers } from "redux";
import inputTextReducer from "./reducers/inputTextReducer";
import tasksReducer from "./reducers/tasksReducer";
import inputErrorReducer from "./reducers/inputErrorReducer";
import filterReducer from "./reducers/filterReducer";
import taskErrorReducer from "./reducers/taskErrorReducer";

const store = createStore(
  combineReducers({
    inputText: inputTextReducer,
    tasks: tasksReducer,
    inputError: inputErrorReducer,
    filter: filterReducer,
    taskError: taskErrorReducer,
  }),
);
export default store;
