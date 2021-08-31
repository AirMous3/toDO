import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolist, RemoveTodolist} from "./todolists-Reducer";

type StateType = TasksStateType
type ActionsType =
    ReturnType<typeof AddTask>
    | ReturnType<typeof RemoveTask>
    | ReturnType<typeof ChangeTaskStatus>
    | ReturnType<typeof ChangeTaskTitle>
    | ReturnType<typeof AddTodolist>
    | ReturnType<typeof RemoveTodolist>

export const tasksReducer = (state: StateType, action: ActionsType): StateType => {
    switch (action.type) {
        case "REMOVE-TASK":

            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)}

        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ?
                    {id: t.id, title: t.title, isDone: action.status} : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ?
                    {id: t.id, title: action.title, isDone: t.isDone} : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolistId]: []}
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.id]
            return copyState

        default:
            return state
    }
}


export const AddTask = (title: string, todolistId: string) => ({type: "ADD-TASK", title, todolistId}) as const
export const RemoveTask = (taskId: string, todolistId: string) => ({type: "REMOVE-TASK", taskId, todolistId}) as const
export const ChangeTaskStatus = (taskId: string, status: boolean, todolistId: string) => ({
    type: "CHANGE-TASK-STATUS",
    taskId,
    status,
    todolistId
}) as const

export const ChangeTaskTitle = (taskId: string, title: string, todolistId: string) => ({
    type: "CHANGE-TASK-TITLE", taskId,
    title,
    todolistId
}) as const