import { loginTypes } from "../types/login";

const initialState = {
  user: { login: "", pass: "" },
  loading: false,
  error: false,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case loginTypes.LOGIN_SUCCESS:
      return { loading: false, error: false };
    case loginTypes.LOGIN_SERVER_ERROR:
      return { loading: false, error: action.payload, user: state.user };
    case loginTypes.LOGIN_DATA_ERROR:
      return { loading: false, error: action.payload, user: state.user };
    default:
      return state;
  }
};
