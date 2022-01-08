import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { authAPI, ResponseType } from '../../../../api/todolists-api';
import { APP_SAGA_INITIALIZE } from '../constants';
import { setAppInitialize } from '../actions';
import { setIsLoggedIn } from '../../loginReducer/actions';

export function* initializeAppSaga(): Generator<StrictEffect, void, AxiosResponse<ResponseType>> {
  try {
    const res = yield call(authAPI.authMe);
    if (res.data.resultCode === 0) {
      yield put(setAppInitialize(true));
      yield put(setIsLoggedIn(true));
    }
  } finally {
    yield put(setAppInitialize(true));
  }
}

export function* appWatcherSaga() {
  yield takeEvery(APP_SAGA_INITIALIZE, initializeAppSaga);
}
