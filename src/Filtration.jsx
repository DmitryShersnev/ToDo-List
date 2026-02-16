import { useDispatch } from "react-redux";
import { all, active, done } from "./redux/filterSlice";

const Filtrarion = () => {
  const dispatch = useDispatch();
  const handleClickAll = () => {
    dispatch(all());
  };
  const handleClickActive = () => {
    dispatch(active());
  };
  const handleClickDone = () => {
    dispatch(done());
  };
  return (
    <>
      <button onClick={handleClickAll}>Все</button>
      <button onClick={handleClickActive}>Активные</button>
      <button onClick={handleClickDone}>Завершённые</button>
    </>
  );
};
export default Filtrarion;
