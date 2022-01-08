import { setIsLoggedIn } from './actions';
import { LOGIN_REDUCER_IS_LOGGED_IN } from './constants';

type InitialStateType = {
  isLogged: boolean;
};
type ActionsType = ReturnType<typeof setIsLoggedIn>;

let initialState: InitialStateType = {
  isLogged: false,
};

export const loginReducer = (
  state: InitialStateType = initialState,
  action: ActionsType,
): InitialStateType => {
  switch (action.type) {
    case LOGIN_REDUCER_IS_LOGGED_IN:
      return { ...state, isLogged: action.value };
    default:
      return state;
  }
};
