import Task from "./Task";

const TasksList = ({ deleteTask, changeCheckbox, filteredTasks }) => {
  return (
    <>
      {filteredTasks.map((item) => (
        <Task
          key={item.id}
          item={item}
          deleteTask={deleteTask}
          changeCheckbox={changeCheckbox}
        />
      ))}
    </>
  );
};

export default TasksList;
