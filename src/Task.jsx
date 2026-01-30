import { useState, useRef, useEffect } from "react";

const Task = ({ item, deleteTask, changeCheckbox, changeTitle }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editText, setEditText] = useState(item.title);
  const inputRef = useRef(null);

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
      changeTitle(item.id, editText);
      setIsEdit(false);
    } else if (e.key === "Escape") {
      setIsEdit(false);
    }
  };

  const handleSaveClick = () => {
    changeTitle(item.id, editText);
    setIsEdit(false);
  };

  return (
    <div className="task">
      <input
        type="checkbox"
        checked={item.isDone}
        onChange={() => changeCheckbox(item.id)}
      />
      {isEdit ? (
        <>
          <input
            ref={inputRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSaveClick}>💾</button>
        </>
      ) : (
        <>
          <p className={item.isDone ? "checked" : ""}>{item.title}</p>
          <button onClick={() => setIsEdit(true)}>🖊️</button>
        </>
      )}

      <button onClick={() => deleteTask(item.id)}>❌</button>
    </div>
  );
};

export default Task;
