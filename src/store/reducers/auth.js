import { authTypes } from "../types/auth";

const initialState = {
  user: { login: "", pass: "" },
  loading: false,
  error: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.AUTH_SUCCESS:
      return { loading: false, error: false };
    case authTypes.AUTH_SERVER_ERROR:
      return { loading: false, error: action.payload, user: state.user };
    case authTypes.AUTH_DATA_ERROR:
      return { loading: false, error: action.payload, user: state.user };
    default:
      return state;
  }
};
