import { login } from "../api/apiCalls";
import * as ACTIONS from "../components/Constants";

export const logoutSuccess = () => {
  return {
    type: ACTIONS.LOGOUT_SUCCESS,
  };
};

export const loginSuccess = (authState) => {
  return {
    type: ACTIONS.LOGIN_SUCCESS,
    payload: authState,
  };
};

export const loginHandler = (credentials) => {
  return async function (dispatch) {
    const response = await login(credentials);

    const authState = {
      ...response.data,
      password: credentials.password,
    };
    dispatch(loginSuccess(authState));
    return response;
  };
};
