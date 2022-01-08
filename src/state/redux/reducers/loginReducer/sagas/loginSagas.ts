import { authAPI, ResponseType } from '../../../../api/todolists-api';
import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { setAppError, setAppStatus } from '../../appReducer/actions';
import { setIsLoggedIn } from '../actions';
import { LOGIN_SAGA_LOGIN, LOGIN_SAGA_LOGOUT } from '../constants';
import { login } from './actions';

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

export function* loginWatcherSaga() {
  yield takeEvery(LOGIN_SAGA_LOGIN, loginSaga);
  yield takeEvery(LOGIN_SAGA_LOGOUT, logOutSaga);
}
