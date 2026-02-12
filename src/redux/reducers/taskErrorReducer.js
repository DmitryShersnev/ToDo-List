const initialTaskError = {
  taskError: false,
};

const taskErrorReducer = (store = initialTaskError, action) => {
  switch (action.type) {
    case "taskError":
      return {
        ...store,
        taskError: true,
      };
    case "taskNotError":
      return {
        ...store,
        taskError: false,
      };
    default:
      return store;
  }
};
export default taskErrorReducer;
