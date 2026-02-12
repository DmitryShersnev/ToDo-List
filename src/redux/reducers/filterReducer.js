const initialFilter = {
  filter: "all",
};

const filterReducer = (store = initialFilter, action) => {
  switch (action.type) {
    case "all":
      return {
        ...store,
        filter: "all",
      };
    case "done":
      return {
        ...store,
        filter: "done",
      };
    case "active":
      return {
        ...store,
        filter: "active",
      };
    default:
      return store;
  }
};
export default filterReducer;
