import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Task = ({ item, deleteTask, changeCheckbox, changeTitle }) => {
  const inputRef = useRef(null);

  const { errorTaskId } = useSelector((store) => store.errorTaskId);
  const { editTaskId } = useSelector((store) => store.editTaskId);
  const { editText } = useSelector((store) => store.editText);

  const isEdit = editTaskId === item.id;
  const showError = errorTaskId === item.id;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit) {
      dispatch({ type: "initEditText", payload: item.title });
      dispatch({ type: "clearError" });
    }
  }, [isEdit, item.title, dispatch]);

  useEffect(() => {
    if (!isEdit) return;
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        dispatch({ type: "stopEdit" });
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
        changeTitle(item.id, editText);
        dispatch({ type: "stopEdit" });
        dispatch({ type: "clearError" });
      } else {
        dispatch({ type: "setError", payload: { id: item.id } });
      }
    }
    if (e.key === "Escape") {
      dispatch({ type: "stopEdit" });
    }
  };

  const handleClick = () => {
    if (editText.trim() !== "") {
      changeTitle(item.id, editText);
      dispatch({ type: "stopEdit" });
      dispatch({ type: "clearError" });
    } else {
      dispatch({ type: "setError", payload: { id: item.id } });
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
                onChange={(e) =>
                  dispatch({ type: "changeEditText", payload: e.target.value })
                }
                onKeyDown={handleKeyDown}
              />{" "}
              <button onClick={handleClick}>💾</button>
            </div>
          </>
        ) : (
          <>
            <p className={item.isDone ? "checked" : ""}>{item.title}</p>
            <button
              onClick={() => {
                dispatch({ type: "startEdit", payload: { id: item.id } });
              }}
            >
              🖊️
            </button>
          </>
        )}

        <button onClick={() => deleteTask(item.id)}>❌</button>
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
