import { useState } from "react";

const InputTask = ({ filteredTasks, setTasks }) => {
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    setInputText(e.target.value);
  };
  const handleClick = () => {
    if (inputText.length === 0 || inputText.trim() === "") {
      setError(true);
    } else {
      setTasks((filteredTasks) => [
        ...filteredTasks,
        { id: crypto.randomUUID(), title: inputText, isDone: false },
      ]);
      setInputText("");
      setError(false);
    }
  };
  return (
    <>
      <input value={inputText} onChange={handleChange} />
      <button onClick={handleClick}>Добавить</button>
      <br />
      {error ? (
        <p style={{ color: "red" }}>
          Строка не должна быть пустой или состоять только из пробелов
        </p>
      ) : (
        ""
      )}
    </>
  );
};

export default InputTask;
