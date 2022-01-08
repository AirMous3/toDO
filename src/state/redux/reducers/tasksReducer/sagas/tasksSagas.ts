import { call, put, StrictEffect, takeEvery } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import {
  GetTasksResponseType,
  ResponseType,
  todolistsAPI,
  UpdateTaskType,
} from '../../../../api/todolists-api';
import { setAppError, setAppStatus } from '../../appReducer/actions';
import { RequestStatusType } from '../../appReducer/appReducer';
import { TaskType } from '../tasksReducer';
import {
  TASKS_SAGA_ADD_TASK,
  TASKS_SAGA_DELETE_TASK,
  TASKS_SAGA_GET_TASKS,
  TASKS_SAGA_UPDATE_TASK,
} from '../constants';
import { addTask, deleteTask, getTasks } from './actions';
import { changeTodolistEntityStatus } from '../../todolists-Reducer';
import {
  addTaskAC,
  changeTaskEntityStatus,
  removeTask,
  setTasks,
  updateTask,
  updateTaskAC,
} from '../actions/tasksActions';
import { store } from '../../../store';

export function* tasksWatcherSaga() {
  yield takeEvery(TASKS_SAGA_GET_TASKS, getTasksSaga);
  yield takeEvery(TASKS_SAGA_DELETE_TASK, deleteTaskSaga);
  yield takeEvery(TASKS_SAGA_ADD_TASK, addTaskSaga);
  yield takeEvery(TASKS_SAGA_UPDATE_TASK, updateTaskSaga);
}

export function* getTasksSaga(
  action: ReturnType<typeof getTasks>,
): Generator<StrictEffect, void, AxiosResponse<GetTasksResponseType>> {
  yield put(setAppStatus('loading'));
  const res = yield call(todolistsAPI.getTasks, action.todolistId);
  let tasks = res.data.items.map((t) => ({
    ...t,
    entityStatus: 'idle' as RequestStatusType,
  })); /*Добавляем такске ЭнтитиСтатус*/
  yield put(setTasks(tasks, action.todolistId));
  yield put(setAppStatus('succeeded'));
}

export function* deleteTaskSaga(action: ReturnType<typeof deleteTask>) {
  yield put(setAppStatus('loading'));
  yield put(changeTaskEntityStatus(action.todolistId, action.taskId, 'loading'));
  yield call(todolistsAPI.deleteTask, action.todolistId, action.taskId);
  yield put(removeTask(action.taskId, action.todolistId));
  yield put(setAppStatus('succeeded'));
}

export function* addTaskSaga(
  action: ReturnType<typeof addTask>,
): Generator<StrictEffect, void, AxiosResponse<ResponseType<{ item: TaskType }>>> {
  yield put(setAppStatus('loading'));
  yield put(changeTodolistEntityStatus(action.todolistId, 'loading'));
  const res = yield call(todolistsAPI.createTask, action.todolistId, action.title);
  if (res.data.resultCode === 0) {
    let task = {
      ...res.data.data.item,
      entityStatus: 'idle' as RequestStatusType,
    }; /*Добавляем такске ЭнтитиСтатус*/
    yield put(addTaskAC(task));
    yield put(setAppStatus('succeeded'));
    yield put(changeTodolistEntityStatus(action.todolistId, 'idle'));
  } else {
    if (res.data.messages.length > 0) {
      yield put(setAppError(res.data.messages[0]));
      yield put(setAppStatus('succeeded'));
      yield put(changeTodolistEntityStatus(action.todolistId, 'idle'));
    } else {
      yield put(setAppError('some error'));
      yield put(changeTodolistEntityStatus(action.todolistId, 'idle'));
      yield put(setAppStatus('failed'));
    }
  }
}

export function* updateTaskSaga(
  action: ReturnType<typeof updateTask>,
): Generator<StrictEffect, void, AxiosResponse<ResponseType<{ item: TaskType }>>> {
  yield put(setAppStatus('loading'));
  yield put(changeTaskEntityStatus(action.todolistId, action.taskId, 'loading'));
  let currentTask = store.getState().tasks[action.todolistId].find((t) => t.id === action.taskId); //Достаём нужную таску
  if (currentTask) {
    let model: UpdateTaskType = {
      ...currentTask,
      ...action.domainModel,
    };

    const res = yield call(todolistsAPI.updateTask, action.todolistId, action.taskId, model);
    try {
      if (res.data.resultCode === 0) {
        yield put(updateTaskAC(action.todolistId, action.taskId, model));
        yield put(setAppStatus('succeeded'));
        yield put(changeTaskEntityStatus(action.todolistId, action.taskId, 'succeeded'));
      } else {
        yield put(setAppError(res.data.messages[0]));
        yield put(setAppStatus('failed'));
        yield put(changeTaskEntityStatus(action.todolistId, action.taskId, 'succeeded'));
      }
    } catch (error) {
      if (error instanceof Error) {
        yield put(setAppError(error.message));
        yield put(setAppStatus('failed'));
      }
    }
  } else {
    console.warn('task not found in state');
  }
}
