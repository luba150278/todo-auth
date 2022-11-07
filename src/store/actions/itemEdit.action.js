import instance from "../../api/request";
import { ERROR_ADD_ITEM_DATA, ERROR_CHANGE_ITEM_DATA, ERROR_CHANGE_ITEM_SERVER } from "../../common/constants/constants";
import { itemTypes } from "../types/item.types";

export const fetchEditItem = (text, id, checked) => async (dispatch) => {
  try {
    if (text === "") {
      return dispatch({
        type: itemTypes.ITEM_DATA_ERROR,
        payload: ERROR_ADD_ITEM_DATA,
      });
    }
    dispatch({
      type: itemTypes.ITEM_WAIT_CHANGES,
    });
    const activeID = localStorage.getItem("activeID") || "";
    const res = await instance.post("router?action=editItem", {
      activeID,
      text,
      id,
      checked
    });

    if (res.data.ok) {
      return dispatch({ type: itemTypes.ITEM_CHANGE, payload: res.data.ok });
    }
    return dispatch({
      type: itemTypes.ITEM_DATA_ERROR,
      payload: ERROR_CHANGE_ITEM_DATA,
    });
  } catch (e) {
    return dispatch({
      type: itemTypes.ITEM_SERVER_ERROR,
      payload: ERROR_CHANGE_ITEM_SERVER,
    });
  }
};
