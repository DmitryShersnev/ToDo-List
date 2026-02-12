import { useSelector, useDispatch } from "react-redux";

const InputTask = () => {
  const { inputText } = useSelector((store) => store.inputText);
  const { error } = useSelector((store) => store.inputError);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch({ type: "change", payload: e.target.value });
  };

  const handleClick = () => {
    if (inputText.length === 0 || inputText.trim() === "") {
      dispatch({ type: "error" });
    } else {
      dispatch({ type: "add", payload: inputText });
      dispatch({ type: "notError" });
    }
  };
  return (
    <>
      <input value={inputText} onChange={handleChange} />
      <button onClick={handleClick}>Добавить</button>
      <br />
      {error && (
        <p style={{ color: "red" }}>
          Строка не должна быть пустой или состоять только из пробелов
        </p>
      )}
    </>
  );
};

export default InputTask;
