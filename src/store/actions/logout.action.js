import instance from "../../api/request";
import { clearSrorage } from "../../common/clearLocalStorageFunction";
import { ERROR_LOGOUT_DATA_MESSAGE, ERROR_LOGOUT_SERVER_MESSAGE } from "../../common/constants/constants";
import { logoutTypes } from "../types/logout.types";


export const fetchLogout = () => async (dispatch) => {
  try {
    const res = await instance.post("router?action=logout");
    if (res.data.ok) { 
      clearSrorage();
      return dispatch({
        type: logoutTypes.LOGOUT_SUCCESS
      });
    }
    return dispatch({
      type: logoutTypes.LOGOUT_ERROR,
      payload: ERROR_LOGOUT_DATA_MESSAGE,
    });
  } catch (e) {
    return dispatch({
      type: logoutTypes.LOGOUT_SERVER_ERROR,
      payload: ERROR_LOGOUT_SERVER_MESSAGE,
    });
  }
};