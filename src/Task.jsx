import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { startEdit, stopEdit } from "./redux/editSlice";
import { setError, clearError } from "./redux/editTaskErrorSlice";
import { initEditText, changeEditText } from "./redux/editTextSlice";
import { addNewTask } from "./redux/tasksSlice";

const Task = ({ item, deleteTask, changeCheckbox }) => {
  const inputRef = useRef(null);
  const { editTaskId } = useSelector((store) => store.editTaskId);

  const { errorTaskId } = useSelector((store) => store.errorTaskId);

  const { editText } = useSelector((store) => store.editText);

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
  const changeTitle = (id, newTitle) => {
    dispatch(addNewTask({ id, newTitle }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (editText.trim() !== "") {
        changeTitle(item.id, editText);
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
      changeTitle(item.id, editText);
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
          checked={item.isDone}
          onChange={() => changeCheckbox(item.id)}
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
            <p className={item.isDone ? "checked" : ""}>{item.title}</p>
            <button
              onClick={() => {
                dispatch(startEdit(item.id));
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
