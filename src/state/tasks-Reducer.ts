import {v1} from "uuid";
import {AddTodolist, RemoveTodolist, todolistId1, todolistId2} from "./todolists-Reducer";


///////////////////////// TYPE
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type StateType = TasksStateType
type ActionsType =
    ReturnType<typeof AddTask>
    | ReturnType<typeof RemoveTask>
    | ReturnType<typeof ChangeTaskStatus>
    | ReturnType<typeof ChangeTaskTitle>
    | ReturnType<typeof AddTodolist>
    | ReturnType<typeof RemoveTodolist>

//////////////////////////////////////

let initialState = {
    [todolistId1]: [
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "Js", isDone: true},
        {id: v1(), title: "CSS", isDone: false},
    ],
    [todolistId2]: [
        {id: v1(), title: "Book", isDone: false},
        {id: v1(), title: "Beer", isDone: false},
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "Water", isDone: true},
        {id: v1(), title: "Wine", isDone: false},
    ]}

export const tasksReducer = (state = initialState, action: ActionsType): StateType => {
    switch (action.type) {
        case "REMOVE-TASK":

            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}

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

//////////////////////////////// AC
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