import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-Reducer";
import {todolistsReducer} from "./todolists-Reducer";
import thunk from "redux-thunk"
import {appReducer} from "./app-Reducer";
import {logginReducer} from "./loggin-Reducer";


const RootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    loggin: logginReducer
})

export const store = createStore(RootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof RootReducer>