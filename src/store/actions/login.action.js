import instance from "../../api/request";
import {
  ERROR_AUTH_SERVER_MESSAGE,
  ERROR_AUTH_DATA_MESSAGE,
  ERROR_AUTH_EMPTY_MESSAGE,
} from "../../common/constants/constants";
import { authTypes } from "../types/auth.types";
import { saveLoginDataFunction } from "../../common/functions/saveLoginDataFunction";

export const fetchLogin = (login, pass) => async (dispatch) => {
  try {
    if (login === "" && pass === "") {
      return dispatch({
        type: authTypes.AUTH_DATA_ERROR,
        payload: ERROR_AUTH_EMPTY_MESSAGE,
      });
    }

    const res = await instance.post("router?action=login", {
      login,
      pass,
    });
    if (res.data.ok) {
      saveLoginDataFunction(res.data.token, res.data.activeID)
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
