import Task from "./Task";

const TasksList = ({ filteredTasks }) => {
  return (
    <>
      {filteredTasks.map((item) => (
        <Task key={item.id} item={item} />
      ))}
    </>
  );
};

export default TasksList;
