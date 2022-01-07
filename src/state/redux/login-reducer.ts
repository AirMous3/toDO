import { Dispatch } from 'redux';
import { setAppStatus, setAppError } from './app-Reducer';
import { authAPI, LoginPayloadType, ResponseType } from '../api/todolists-api';
import { call, put, StrictEffect } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

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
    case 'IS-LOGGED-IN':
      return { ...state, isLogged: action.value };
    default:
      return state;
  }
};

////////// AC
export const setIsLoggedIn = (value: boolean) => ({ type: 'IS-LOGGED-IN', value } as const);

///////// SAGA

export function* loginSaga(
  action: ReturnType<typeof login>,
): Generator<StrictEffect, void, AxiosResponse<ResponseType>> {
  yield put(setAppStatus('loading'));
  const res = yield call(authAPI.login, action.payload);
  if (res.data.resultCode === 0) {
    yield put(setIsLoggedIn(true));
    yield put(setAppStatus('succeeded'));
  } else {
    yield put(setAppError(res.data.messages[0]));
    yield put(setAppStatus('failed'));
  }
}

export const login = (payload: LoginPayloadType) => ({ type: 'LOGIN/LOGIN', payload });

export function* logOutSaga(): Generator<StrictEffect, void, AxiosResponse<ResponseType>> {
  yield put(setAppStatus('loading'));
  const res = yield call(authAPI.logOut);
  if (res.data.resultCode === 0) {
    yield put(setIsLoggedIn(false));
    yield put(setAppStatus('succeeded'));
  } else {
    yield put(setAppError(res.data.messages[0]));
    yield put(setAppStatus('failed'));
  }
}
export const logOut = () => ({ type: 'LOGIN/LOGOUT' });
