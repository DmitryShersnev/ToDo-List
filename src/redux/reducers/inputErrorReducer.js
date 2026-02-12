const initialError = {
  error: false,
};

const inputErrorReducer = (store = initialError, action) => {
  switch (action.type) {
    case "error":
      return {
        ...store,
        error: true,
      };
    case "notError":
      return {
        ...store,
        error: false,
      };
    default:
      return store;
  }
};
export default inputErrorReducer;
