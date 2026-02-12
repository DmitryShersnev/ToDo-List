const initialTasks = {
  tasks: [],
};

const taskReducer = (store = initialTasks, action) => {
  switch (action.type) {
    case "add":
      return {
        ...store,
        tasks: [
          ...store.tasks,
          {
            id: crypto.randomUUID(),
            title: action.payload,
            isDone: false,
          },
        ],
      };

    case "changeCheckbox": {
      const { id } = action.payload;
      return {
        ...store,
        tasks: store.tasks.map((item) =>
          item.id === id ? { ...item, isDone: !item.isDone } : item,
        ),
      };
    }
    case "deleteTask": {
      const { id } = action.payload;
      return {
        ...store,
        tasks: store.tasks.filter((item) => item.id !== id),
      };
    }
    case "clearDoneTasks":
      return {
        ...store,
        tasks: store.tasks.filter((item) => item.isDone === false),
      };
    case "addNewTask": {
      const { id, newTitle } = action.payload;
      return {
        ...store,
        tasks: store.tasks.map((item) =>
          item.id === id ? { ...item, title: newTitle } : item,
        ),
      };
    }
    default:
      return store;
  }
};
export default taskReducer;
