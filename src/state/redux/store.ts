import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-Reducer";
import {todolistsReducer} from "./todolists-Reducer";
import thunk from "redux-thunk"
import {appReducer, initializeAppSaga} from "./app-Reducer";
import {loginReducer} from "./login-reducer";
import createSagaMiddleware from 'redux-saga'
import {takeEvery} from 'redux-saga/effects'


const RootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    login: loginReducer
})
const sagaMiddleware = createSagaMiddleware()

export const store = createStore(RootReducer, applyMiddleware(thunk, sagaMiddleware))

export type AppRootStateType = ReturnType<typeof RootReducer>

sagaMiddleware.run(rootSaga)

function* rootSaga() {
    alert('root watcher ')
    yield takeEvery('APP/INITIALIZE-APP', initializeAppSaga)
}
