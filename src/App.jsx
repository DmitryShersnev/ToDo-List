import "./App.css";
import { useState, useEffect } from "react";
import Header from "./Header";
import InputTask from "./InputTask";
import TasksList from "./TasksList";
import Filtrarion from "./Filtration";
import Cleaning from "./Cleaning";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  let filteredTasks = [];

  const filterTasks = (filter) => {
    if (filter === "all") {
      filteredTasks = tasks;
    } else if (filter === "active") {
      filteredTasks = tasks.filter((item) => !item.isDone);
    } else if (filter === "done") {
      filteredTasks = tasks.filter((item) => item.isDone);
    }
    return filteredTasks;
  };

  filterTasks(filter);

  const deleteTask = (id) => {
    setTasks((tasks) => tasks.filter((item) => item.id !== id));
  };

  const changeCheckbox = (id) => {
    setTasks((tasks) =>
      tasks.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item,
      ),
    );
  };

  const changeTitle = (id, newTitle) => {
    setTasks((tasks) =>
      tasks.map((item) =>
        item.id === id ? { ...item, title: newTitle } : item,
      ),
    );
  };

  const clearTasks = () => {
    setTasks((tasks) => tasks.filter((item) => item.isDone === false));
  };

  const countOfActive = tasks.filter((item) => item.isDone === false).length;

  return (
    <>
      <Header />
      <InputTask filteredTasks={filteredTasks} setTasks={setTasks} />
      <hr />
      <TasksList
        filteredTasks={filteredTasks}
        deleteTask={deleteTask}
        changeCheckbox={changeCheckbox}
        changeTitle={changeTitle}
      />
      <hr />
      <Filtrarion setFilter={setFilter} />
      <hr />
      <Cleaning countOfActive={countOfActive} clearTasks={clearTasks} />
    </>
  );
}

export default App;
