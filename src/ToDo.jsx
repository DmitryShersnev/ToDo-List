import Header from "./Header";
import InputTask from "./InputTask";
import TasksList from "./TasksList";
import Filtrarion from "./Filtration";
import Cleaning from "./Cleaning";
import { getTasks } from "./redux/tasksSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useSelector, useDispatch } from "react-redux";

function ToDo() {
  const { tasks, loading } = useSelector((store) => store.tasks);

  const { filter } = useSelector((store) => store.filter);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  const dispatch = useDispatch();

  const filteredTasks = tasks.filter((item) => {
    if (filter === "all") return true;
    if (filter === "active") return !item.isCompleted;
    if (filter === "done") return item.isCompleted;
  });

  const countOfActive = tasks.filter(
    (item) => item.isCompleted === false,
  ).length;

  const handleClick = () => {
    localStorage.removeItem("token");
    navigate(0);
  };

  return (
    <>
      <Header />

      <InputTask />
      <hr />
      {loading ? "Loading..." : null}
      <TasksList filteredTasks={filteredTasks} />
      <hr />
      <Filtrarion />
      <hr />
      <Cleaning countOfActive={countOfActive} />
      <button onClick={() => handleClick()}>Разлогиниться</button>
    </>
  );
}

export default ToDo;
