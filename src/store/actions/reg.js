import instance from "../../api/request";
import {
  ERROR_AUTH_SERVER_MESSAGE,
  ERROR_AUTH_DATA_MESSAGE,
  ERROR_AUTH_EMPTY_MESSAGE,
} from "../../common/constants/constants";
import { authTypes } from "../types/auth";

export const fetchReg = (login, pass) => async (dispatch) => {
  try {
    if (login === "" && pass === "") {
      return dispatch({
        type: authTypes.AUTH_DATA_ERROR,
        payload: ERROR_AUTH_EMPTY_MESSAGE,
      });
    }

    const res = await instance.post("router?action=register", {
      login,
      pass,
    });
    if (res.data.ok) {
      
      return dispatch({
        type: authTypes.AUTH_SUCCESS
      });
    }
    return dispatch({
      type: authTypes.AUTH_DATA_ERROR,
      payload: ERROR_AUTH_DATA_MESSAGE,
    });
  } catch (e) {
    return dispatch({
      type: authTypes.AUTH_SERVER_ERROR,
      payload: ERROR_AUTH_SERVER_MESSAGE,
    });
  }
};