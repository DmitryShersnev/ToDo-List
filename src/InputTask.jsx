import { useSelector, useDispatch } from "react-redux";
import { change, clearInput } from "./redux/inputTextSlice";
import { setInputError, clearInputError } from "./redux/inputErrorSlice";
import { createTask } from "./redux/tasksSlice";
import { selectInputText } from "./redux/inputTextSlice";
import { selectInputError } from "./redux/inputErrorSlice";

const InputTask = () => {
  const inputText = useSelector(selectInputText);
  const inputError = useSelector(selectInputError);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(change(e.target.value));
  };

  const handleClick = () => {
    if (inputText.length === 0 || inputText.trim() === "") {
      dispatch(setInputError());
    } else {
      dispatch(createTask(inputText));
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
