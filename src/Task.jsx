import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Task = ({ item, deleteTask, changeCheckbox, changeTitle }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(item.title);

  const inputRef = useRef(null);

  const { taskError } = useSelector((store) => store.taskError);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEdit) return;
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsEdit(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEdit]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (editText.trim() !== "") {
        changeTitle(item.id, editText);
        setIsEdit(false);
        dispatch({ type: "taskError" });
      } else {
        dispatch({ type: "taskNotError" });
      }
    }
    if (e.key === "Escape") {
      setIsEdit(false);
    }
  };

  const handleClick = () => {
    if (editText.trim() !== "") {
      changeTitle(item.id, editText);
      setIsEdit(false);
      dispatch({ type: "taskError" });
    } else {
      dispatch({ type: "taskNotError" });
    }
  };

  return (
    <>
      <div className="task">
        <input
          type="checkbox"
          checked={item.isDone}
          onChange={() => changeCheckbox(item.id)}
        />
        {isEdit ? (
          <>
            <div ref={inputRef}>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyDown}
              />{" "}
              <button onClick={handleClick}>💾</button>
            </div>
          </>
        ) : (
          <>
            <p className={item.isDone ? "checked" : ""}>{item.title}</p>
            <button onClick={() => setIsEdit(true)}>🖊️</button>
          </>
        )}

        <button onClick={() => deleteTask(item.id)}>❌</button>
      </div>
      {taskError && (
        <p style={{ color: "red" }}>
          Строка не должна быть пустой или состоять только из пробелов
        </p>
      )}
    </>
  );
};

export default Task;
