const initialInputText = { inputText: "" };

const inputTextReducer = (store = initialInputText, action) => {
  switch (action.type) {
    case "change":
      return { ...store, inputText: action.payload };
    case "add":
      return { ...store, inputText: "" };

    default:
      return store;
  }
};

export default inputTextReducer;
