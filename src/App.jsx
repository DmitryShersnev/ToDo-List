import "./App.css";

import Header from "./Header";
import InputTask from "./InputTask";
import TasksList from "./TasksList";
import Filtrarion from "./Filtration";
import Cleaning from "./Cleaning";

import { useSelector, useDispatch } from "react-redux";

function App() {
  const { tasks } = useSelector((store) => store.tasks);
  const { filter } = useSelector((store) => store.filter);
  const dispatch = useDispatch();

  const filteredTasks = tasks.filter((item) => {
    if (filter === "all") return true;
    if (filter === "active") return !item.isDone;
    if (filter === "done") return item.isDone;
  });

  const deleteTask = (id) => {
    dispatch({ type: "deleteTask", payload: { id } });
  };

  const changeCheckbox = (id) => {
    dispatch({ type: "changeCheckbox", payload: { id } });
  };

  const changeTitle = (id, newTitle) => {
    dispatch({ type: "addNewTask", payload: { id, newTitle } });
  };

  const clearTasks = () => {
    dispatch({ type: "clearDoneTasks" });
  };

  const countOfActive = tasks.filter((item) => item.isDone === false).length;

  return (
    <>
      <Header />

      <InputTask />
      <hr />
      <TasksList
        filteredTasks={filteredTasks}
        deleteTask={deleteTask}
        changeCheckbox={changeCheckbox}
        changeTitle={changeTitle}
      />
      <hr />
      <Filtrarion />
      <hr />
      <Cleaning countOfActive={countOfActive} clearTasks={clearTasks} />
    </>
  );
}

export default App;
