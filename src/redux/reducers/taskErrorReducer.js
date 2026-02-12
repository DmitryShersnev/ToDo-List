const initialTaskError = {
  errorTaskId: null,
};

const taskErrorReducer = (store = initialTaskError, action) => {
  switch (action.type) {
    case "setError":
      return {
        ...store,
        errorTaskId: action.payload.id,
      };
    case "clearError":
      return {
        ...store,
        errorTaskId: null,
      };
    default:
      return store;
  }
};
export default taskErrorReducer;
