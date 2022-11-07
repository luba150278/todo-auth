import instance from "../../api/request";
import { ERROR_DELETE_ITEM_DATA, ERROR_DELETE_ITEM_SERVER } from "../../common/constants/constants";
import { itemTypes } from "../types/item.types";

export const fetchDeleteItem = (id) => async (dispatch) => {
  try {
    if (id === "") {
      return dispatch({
        type: itemTypes.ITEM_DATA_ERROR,
        payload: ERROR_DELETE_ITEM_DATA,
      });
    }
    dispatch({
      type: itemTypes.ITEM_WAIT_CHANGES,
    });
    const activeID = localStorage.getItem("activeID") || "";
    const res = await instance.post("router?action=deleteItem", {
      activeID,      
      id,
    });

    if (res.data.ok) {
      return dispatch({ type: itemTypes.ITEM_DELETE, payload: res.data.ok });
    }
    return dispatch({
      type: itemTypes.ITEM_DATA_ERROR,
      payload: ERROR_DELETE_ITEM_DATA,
    });
  } catch (e) {
    return dispatch({
      type: itemTypes.ITEM_SERVER_ERROR,
      payload: ERROR_DELETE_ITEM_SERVER,
    });
  }
};
