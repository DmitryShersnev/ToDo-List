import Task from "./Task";

const TasksList = ({
  deleteTask,
  changeCheckbox,
  changeTitle,
  filteredTasks,
}) => {
  return (
    <>
      {filteredTasks.map((item) => (
        <Task
          key={item.id}
          item={item}
          deleteTask={deleteTask}
          changeCheckbox={changeCheckbox}
          changeTitle={changeTitle}
        />
      ))}
    </>
  );
};

export default TasksList;
