import { loginTypes } from "../types/login";

const initialState = {
  user: { login: '', pass: '' },
  loading: false,
  error: false,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case loginTypes.LOGIN:
      return { loading: true, error: false, user: { login: '', pass: '' } };
    case loginTypes.LOGIN_SUCCESS:
      return { loading: false, error: false, user: action.payload };
    case loginTypes.LOGIN_ERROR:
      return { loading: false, error: action.payload, user: state.user };
    default:
      return state;
  }
};