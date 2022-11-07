import instance from "../../api/request";
import {
  ERROR_LOGIN_SERVER_MESSAGE,
  ERROR_LOGIN_DATA_MESSAGE,
} from "../../common/constants/constants";
import { loginTypes } from "../types/login";
import { saveLoginDataFunction } from "../../common/saveLoginDataFunction";

export const fetchLogin = (login, pass) => async (dispatch) => {
  try {
    if (login === "" && pass === "") {
      return dispatch({
        type: loginTypes.LOGIN_DATA_ERROR,
        payload: ERROR_LOGIN_DATA_MESSAGE,
      });
    }

    const res = await instance.post("router?action=login", {
      login,
      pass,
    });
    if (res.data.ok) {
      saveLoginDataFunction(res.data.token, res.data.activeID)
      return;
    }
    return dispatch({
      type: loginTypes.LOGIN_DATA_ERROR,
      payload: ERROR_LOGIN_DATA_MESSAGE,
    });
  } catch (e) {
    return dispatch({
      type: loginTypes.LOGIN_SERVER_ERROR,
      payload: ERROR_LOGIN_SERVER_MESSAGE,
    });
  }
};
