import { deleteDoneTasks } from "./redux/tasksSlice";
import { useDispatch } from "react-redux";

const Cleaning = ({ countOfActive }) => {
  const dispatch = useDispatch();

  return (
    <div className="cleaning">
      <p>Осталось дел: {countOfActive} </p>
      <button onClick={() => dispatch(deleteDoneTasks())}>
        Удалить выполненные
      </button>
    </div>
  );
};
export default Cleaning;
