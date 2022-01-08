import { setAppError, setAppStatus, setAppInitialize } from './actions';
import {
  APP_REDUCER_CHANGE_STATUS,
  APP_REDUCER_SET_APP_ERROR,
  APP_REDUCER_SET_APP_INITIALIZE,
} from './constants';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

type InitialStateType = {
  status: RequestStatusType;
  error: string | null;
  isInitialized: boolean;
};
let initialState: InitialStateType = {
  status: 'idle',
  error: null /*Если будет строка, покажет эту строку в всплывашке*/,
  isInitialized: false /*True если приложение инициализированно*/,
};

type ActionType =
  | ReturnType<typeof setAppStatus>
  | ReturnType<typeof setAppError>
  | ReturnType<typeof setAppInitialize>;

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionType,
): InitialStateType => {
  switch (action.type) {
    case APP_REDUCER_CHANGE_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case APP_REDUCER_SET_APP_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case APP_REDUCER_SET_APP_INITIALIZE:
      return {
        ...state,
        isInitialized: action.value,
      };
    default:
      return state;
  }
};
