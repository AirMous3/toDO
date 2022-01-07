import { Dispatch } from 'redux';
import { authAPI, MeResponseType, ResponseType } from '../api/todolists-api';
import { setIsLoggedIn } from './login-reducer';
import { call, put, StrictEffect } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

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
  | ReturnType<typeof setInitialize>;

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionType,
): InitialStateType => {
  switch (action.type) {
    case 'CHANGE-STATUS':
      return {
        ...state,
        status: action.status,
      };
    case 'SET-APP-ERROR':
      return {
        ...state,
        error: action.error,
      };
    case 'SET-INITIALIZE':
      return {
        ...state,
        isInitialized: action.value,
      };
    default:
      return state;
  }
};

////////// AC
export const setAppStatus = (status: RequestStatusType) =>
  ({
    type: 'CHANGE-STATUS',
    status,
  } as const);
export const setAppError = (error: string | null) => ({ type: 'SET-APP-ERROR', error } as const);
export const setInitialize = (value: boolean) => ({ type: 'SET-INITIALIZE', value } as const);

///////// SAGA

export function* initializeAppSaga(): Generator<StrictEffect, void, AxiosResponse<ResponseType>> {
  try {
    const res = yield call(authAPI.authMe);
    if (res.data.resultCode === 0) {
      yield put(setInitialize(true));
      yield put(setIsLoggedIn(true));
    }
  } finally {
    yield put(setInitialize(true));
  }
}

export const initializeApp = () => ({ type: 'APP/INITIALIZE-APP' });
