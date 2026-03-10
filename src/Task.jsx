import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startEdit, stopEdit } from "./redux/editSlice";
import { setError, clearError } from "./redux/editTaskErrorSlice";
import { initEditText, changeEditText } from "./redux/editTextSlice";
import { deleteTask, changeCheckbox, updateTask } from "./redux/tasksSlice";
import { selectEditText } from "./redux/editTextSlice";
import { selectEditTaskId } from "./redux/editSlice";
import { selectErrorTaskId } from "./redux/editTaskErrorSlice";

const Task = ({ item }) => {
  const inputRef = useRef(null);

  const editTaskId = useSelector(selectEditTaskId);

  const errorTaskId = useSelector(selectErrorTaskId);

  const editText = useSelector(selectEditText);
  console.log(editText);

  const isEdit = editTaskId === item.id;
  const showError = errorTaskId === item.id;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit) {
      dispatch(initEditText(item.title));
      dispatch(clearError());
    }
  }, [isEdit, item.title, dispatch]);

  useEffect(() => {
    if (!isEdit) return;
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        dispatch(stopEdit());
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEdit, dispatch]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (editText.trim() !== "") {
        dispatch(updateTask([item.id, editText]));
        dispatch(stopEdit());
        dispatch(clearError());
      } else {
        dispatch(setError(item.id));
      }
    }
    if (e.key === "Escape") {
      dispatch(stopEdit());
    }
  };

  const handleClick = () => {
    if (editText.trim() !== "") {
      dispatch(updateTask([item.id, editText]));
      dispatch(stopEdit());
      dispatch(clearError());
    } else {
      dispatch(setError(item.id));
    }
  };

  return (
    <>
      <div className="task">
        <input
          type="checkbox"
          checked={item.isCompleted}
          onChange={() => dispatch(changeCheckbox(item.id))}
        />
        {isEdit ? (
          <>
            <div ref={inputRef}>
              <input
                value={editText}
                onChange={(e) => dispatch(changeEditText(e.target.value))}
                onKeyDown={handleKeyDown}
              />{" "}
              <button onClick={handleClick}>💾</button>
            </div>
          </>
        ) : (
          <>
            <p className={item.isCompleted ? "checked" : ""}>{item.title}</p>
            <button
              onClick={() => {
                dispatch(startEdit(item.id));
              }}
            >
              🖊️
            </button>
          </>
        )}

        <button onClick={() => dispatch(deleteTask(item.id))}>❌</button>
      </div>
      {showError && (
        <p style={{ color: "red" }}>
          Строка не должна быть пустой или состоять только из пробелов
        </p>
      )}
    </>
  );
};

export default Task;
