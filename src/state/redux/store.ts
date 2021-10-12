import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../tasks-Reducer";
import {todolistsReducer} from "../todolists-Reducer";
import thunk from "redux-thunk"


const RootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
})

export const store = createStore(RootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof RootReducer>