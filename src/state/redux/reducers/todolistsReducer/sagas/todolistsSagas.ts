import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { setAppError, setAppStatus } from '../../appReducer/actions';
import { ResponseType, todolistsAPI } from '../../../../api/todolists-api';
import {
  addTodolist,
  changeTodolistEntityStatus,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolists,
} from '../actions';
import { TodolistType } from '../todolistsReducer';
import {
  TODOLISTS_SAGA_CHANGE_TODOLIST_TITLE,
  TODOLISTS_SAGA_CREATE_TODOLIST,
  TODOLISTS_SAGA_GET_TODOLISTS,
  TODOLISTS_SAGA_REMOVE_TODOLIST,
} from '../constants';
import { changeTodolistTitle, removeTodolist } from './actions';

export function* todolistsWatcherSaga() {
  yield takeEvery(TODOLISTS_SAGA_GET_TODOLISTS, getTodolistsSaga);
  yield takeEvery(TODOLISTS_SAGA_CREATE_TODOLIST, createTodolistSaga);
  yield takeEvery(TODOLISTS_SAGA_REMOVE_TODOLIST, removeTodolistSaga);
  yield takeEvery(TODOLISTS_SAGA_CHANGE_TODOLIST_TITLE, changeTodolistTitleSaga);
}

export function* getTodolistsSaga(): Generator<StrictEffect, void, AxiosResponse<TodolistType[]>> {
  yield put(setAppStatus('loading')); /*Подключаем прелоадер*/
  const res = yield call(todolistsAPI.getTodolists);
  try {
    yield put(setTodolists(res.data));
    yield put(setAppStatus('succeeded')); /*ВЫключаем прелоадер*/
  } catch (e) {
    if (e instanceof Error) {
      yield put(setAppError(e.message)); /*Диспатчим ошибку*/
      yield put(setAppStatus('failed'));
    }
  }
}

export function* createTodolistSaga(
  action: any,
): Generator<StrictEffect, void, AxiosResponse<ResponseType<{ item: TodolistType }>>> {
  yield put(setAppStatus('loading'));
  const res = yield call(todolistsAPI.createTodolist, action.title);
  if (res.data.resultCode === 0) {
    let payload: TodolistType = res.data.data.item;
    yield put(addTodolist(action.title, payload));
    yield put(setAppStatus('succeeded'));
  } else {
    if (res.data.messages.length > 0) {
      yield put(setAppError(res.data.messages[0]));
      yield put(setAppStatus('succeeded'));
    } else {
      yield put(setAppError('some error'));
      yield put(setAppStatus('succeeded'));
    }
  }
}

export function* removeTodolistSaga(
  action: ReturnType<typeof removeTodolist>,
): Generator<StrictEffect, void, AxiosResponse<ResponseType>> {
  yield put(setAppStatus('loading'));
  yield put(changeTodolistEntityStatus(action.todolistId, 'loading'));
  yield call(todolistsAPI.deleteTodolist, action.todolistId);
  yield put(removeTodolistAC(action.todolistId));
  yield put(setAppStatus('succeeded'));
}

export function* changeTodolistTitleSaga(
  action: ReturnType<typeof changeTodolistTitle>,
): Generator<StrictEffect, void, AxiosResponse<ResponseType>> {
  yield put(setAppStatus('loading'));
  yield put(changeTodolistEntityStatus(action.todolistId, 'loading'));
  yield call(todolistsAPI.updateTodolist, action.todolistId, action.title);
  yield put(changeTodolistTitleAC(action.todolistId, action.title));
  yield put(setAppStatus('succeeded'));
  yield put(changeTodolistEntityStatus(action.todolistId, 'succeeded'));
}
