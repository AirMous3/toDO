import { applyMiddleware, combineReducers, createStore } from 'redux';
import { tasksReducer } from './reducers/tasksReducer/tasksReducer';
import { todolistsReducer } from './reducers/todolists-Reducer';
import thunk from 'redux-thunk';
import { appReducer } from './reducers/appReducer/appReducer';
import { loginReducer } from './reducers/loginReducer/loginReducer';
import createSagaMiddleware from 'redux-saga';
import { appWatcherSaga } from './reducers/appReducer/sagas/appSagas';
import { loginWatcherSaga } from './reducers/loginReducer/sagas/loginSagas';
import { all } from 'redux-saga/effects';
import { tasksWatcherSaga } from './reducers/tasksReducer/sagas/tasksSagas';

const RootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  login: loginReducer,
});
const sagaMiddleware = createSagaMiddleware();

export const store = createStore(RootReducer, applyMiddleware(thunk, sagaMiddleware));

export type AppRootStateType = ReturnType<typeof RootReducer>;

sagaMiddleware.run(rootSaga);

function* rootSaga() {
  yield all([appWatcherSaga(), loginWatcherSaga(), tasksWatcherSaga()]);
}
