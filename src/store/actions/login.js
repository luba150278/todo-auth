import instance from "../../api/request";
import {
  ERROR_LOGIN_SERVER_MESSAGE,
  ERROR_LOGIN_DATA_MESSAGE,
} from "../../common/constants/constants";
import { loginTypes } from "../types/login";

export const fetchLogin = (login, pass) => async (dispatch) => {
  try {
    if (login === "" && pass === "") {
      return dispatch({
        type: loginTypes.LOGIN_DATA_ERROR,
        payload: ERROR_LOGIN_DATA_MESSAGE,
      });
    }

    //dispatch({ type: loginTypes.LOGIN });
    const response = await instance.post("router?action=login", {
      login,
      pass,
    });
    return dispatch({
      type: loginTypes.LOGIN_SUCCESS,
      payload: { token: response.data.token, activeID: response.data.activeID },
    });
  } catch (e) {
    return dispatch({
      type: loginTypes.LOGIN_SERVER_ERROR,
      payload: ERROR_LOGIN_SERVER_MESSAGE,
    });
  }
};
