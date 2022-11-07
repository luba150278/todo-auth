import instance from "../../api/request";
import { ERROR_TODO_DATA, ERROR_TODO_SERVER } from "../../common/constants/constants";

import { todoTypes } from "../types/todo.types";

export const fetchToDo = () => async (dispatch) => {
  try {
    dispatch({
      type: todoTypes.TODO_WAIT_DATA
    });
    const activeID = localStorage.getItem('activeID') || '';
    const res = await instance.post("router?action=getItems", {
      activeID,
    });
    
    if (res.data.items) {
      return dispatch({
        type: todoTypes.TODO_SUCCESS,
        payload: res.data.items,
      });
    }

    return dispatch({
      type: todoTypes.TODO_DATA_ERROR,
      payload: ERROR_TODO_DATA,
    });
  } catch (e) {
    return dispatch({
      type: todoTypes.TODO_SERVER_ERROR,
      payload: ERROR_TODO_SERVER,
    });
  }
};
