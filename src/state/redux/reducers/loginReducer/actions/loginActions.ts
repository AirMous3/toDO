import { LOGIN_REDUCER_IS_LOGGED_IN } from '../constants';

export const setIsLoggedIn = (value: boolean) =>
  ({
    type: LOGIN_REDUCER_IS_LOGGED_IN,
    value,
  } as const);
