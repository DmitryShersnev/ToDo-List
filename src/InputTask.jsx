import { useSelector, useDispatch } from "react-redux";
import { change, clearInput } from "./redux/inputTextSlice";
import { setInputError, clearInputError } from "./redux/inputErrorSlice";
import { addTask } from "./redux/tasksSlice";

const InputTask = () => {
  const { inputText } = useSelector((store) => store.inputText);
  const { inputError } = useSelector((store) => store.inputError);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(change(e.target.value));
  };

  const handleClick = () => {
    if (inputText.length === 0 || inputText.trim() === "") {
      dispatch(setInputError());
    } else {
      dispatch(addTask(inputText));
      dispatch(clearInputError());
      dispatch(clearInput());
    }
  };
  return (
    <>
      <input value={inputText} onChange={handleChange} />
      <button onClick={handleClick}>Добавить</button>
      <br />
      {inputError && (
        <p style={{ color: "red" }}>
          Строка не должна быть пустой или состоять только из пробелов
        </p>
      )}
    </>
  );
};

export default InputTask;
