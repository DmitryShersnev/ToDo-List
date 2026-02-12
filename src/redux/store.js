import { legacy_createStore as createStore, combineReducers } from "redux";

import inputTextReducer from "./reducers/inputTextReducer";
import tasksReducer from "./reducers/tasksReducer";
import inputErrorReducer from "./reducers/inputErrorReducer";
import filterReducer from "./reducers/filterReducer";
import taskErrorReducer from "./reducers/taskErrorReducer";
import editReducer from "./reducers/editReducer";
import editTextReducer from "./reducers/editTextReducer";

const store = createStore(
  combineReducers({
    inputText: inputTextReducer,
    tasks: tasksReducer,
    inputError: inputErrorReducer,
    filter: filterReducer,
    errorTaskId: taskErrorReducer,
    editTaskId: editReducer,
    editText: editTextReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
export default store;
