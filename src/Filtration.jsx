import { useDispatch } from "react-redux";

const Filtrarion = () => {
  const dispatch = useDispatch();
  const handleClickAll = () => {
    dispatch({ type: "all" });
  };
  const handleClickActive = () => {
    dispatch({ type: "active" });
  };
  const handleClickDone = () => {
    dispatch({ type: "done" });
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
