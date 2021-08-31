import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../tasks-Reducer";
import {todolistsReducer} from "../todolists-Reducer";


const RootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
})

export const store = createStore(RootReducer)

export type AppRootStateType = ReturnType<typeof RootReducer>