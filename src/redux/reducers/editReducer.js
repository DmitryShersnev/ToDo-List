const initialValue = {
  editTaskId: null,
};

const editReducer = (store = initialValue, action) => {
  switch (action.type) {
    case "startEdit":
      return {
        ...store,
        editTaskId: action.payload.id,
      };
    case "stopEdit":
      return {
        ...store,
        editTaskId: null,
      };
    default:
      return store;
  }
};
export default editReducer;
