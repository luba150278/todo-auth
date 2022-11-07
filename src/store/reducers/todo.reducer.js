import { todoTypes } from "../types/todo.types";

const initialState = {
  error: false,
  loading: false,
  items: [],
};

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case todoTypes.TODO_WAIT_DATA:
      return { error: false, loading: true };
    case todoTypes.TODO_DATA_ERROR:
      return { error: action.payload, loading: false };
    case todoTypes.TODO_SERVER_ERROR:
      return { error: action.payload, loading: false };
    case todoTypes.TODO_SUCCESS:
      return { error: false, loading: false, items: action.payload };
    default:
      return state;
  }
};
