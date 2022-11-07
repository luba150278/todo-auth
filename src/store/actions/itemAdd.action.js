import instance from "../../api/request";
import { ERROR_ADD_ITEM_DATA, ERROR_ADD_ITEM_EMPTY_DATA, ERROR_ADD_ITEM_SERVER } from "../../common/constants/constants";

import { itemTypes } from "../types/item.types";

export const fetchAddItem = (text) => async (dispatch) => {
  try {
    if (text === "") {
      return dispatch({ type: itemTypes.ITEM_DATA_ERROR, payload: ERROR_ADD_ITEM_EMPTY_DATA })
    }
    dispatch({
      type: itemTypes.ITEM_WAIT_CHANGES
    });
    const activeID = localStorage.getItem('activeID') || '';
    const res = await instance.post("router?action=createItem", {
      activeID,
      text
    });

    if (res.data.id) {
      return dispatch({ type: itemTypes.ITEM_ADD, payload: res.data.id })
    }
    return dispatch({ type: itemTypes.ITEM_DATA_ERROR, payload: ERROR_ADD_ITEM_DATA })
  } catch (e) {
    return dispatch({
      type: itemTypes.ITEM_SERVER_ERROR,
      payload: ERROR_ADD_ITEM_SERVER,
    });
  }
};
