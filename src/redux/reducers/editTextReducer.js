const initialEditText = { editText: "" };

const editTextReducer = (store = initialEditText, action) => {
  switch (action.type) {
    case "initEditText":
      return { ...store, editText: action.payload };
    case "changeEditText":
      return { ...store, editText: action.payload };

    default:
      return store;
  }
};

export default editTextReducer;
