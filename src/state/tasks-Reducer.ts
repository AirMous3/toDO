import {v1} from "uuid";
import {AddTodolist, RemoveTodolist, todolistId1, todolistId2} from "./todolists-Reducer";
import {TaskPriorities, TaskStatuses} from "./api/todolists-api";


///////////////////////// TYPE
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type TaskType = {

    id: string,
    title: string,
    description: string,
    todoListId: string,
    order: number,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,
    addedDate: string

}

type ActionsType =
    ReturnType<typeof AddTask>
    | ReturnType<typeof RemoveTask>
    | ReturnType<typeof ChangeTaskStatus>
    | ReturnType<typeof ChangeTaskTitle>
    | ReturnType<typeof AddTodolist>
    | ReturnType<typeof RemoveTodolist>

//////////////////////////////////////

let initialState: TasksStateType = {
    [todolistId1]: [
        {
            id: v1(), title: "Redux", status: TaskStatuses.New, addedDate: '',
            deadline: '', description: '', order: 0, startDate: '',
            priority: TaskPriorities.Low, todoListId: todolistId1
        },
        {
            id: v1(),
            title: "React",
            status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            startDate: '',
            priority: TaskPriorities.Low,
            todoListId: todolistId1
        },
        {
            id: v1(),
            title: "HTML",
            status: TaskStatuses.Completed,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            startDate: '',
            priority: TaskPriorities.Low,
            todoListId: todolistId1
        },
        {
            id: v1(),
            title: "Js",
            status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            startDate: '',
            priority: TaskPriorities.Low,
            todoListId: todolistId1
        },
        {
            id: v1(),
            title: "CSS",
            status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            startDate: '',
            priority: TaskPriorities.Low,
            todoListId: todolistId1
        },
    ],
    [todolistId2]: [
        {
            id: v1(), title: "Book", status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            startDate: '',
            priority: TaskPriorities.Low,
            todoListId: todolistId2
        },
        {
            id: v1(), title: "Beer", status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            startDate: '',
            priority: TaskPriorities.Low,
            todoListId: todolistId2
        },
        {
            id: v1(), title: "Milk", status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            startDate: '',
            priority: TaskPriorities.Low,
            todoListId: todolistId2
        },
        {
            id: v1(), title: "Water", status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            startDate: '',
            priority: TaskPriorities.Low,
            todoListId: todolistId2
        },
        {
            id: v1(), title: "Wine", status: TaskStatuses.New,
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            startDate: '',
            priority: TaskPriorities.Low,
            todoListId: todolistId2
        },
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":

            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}

        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [{
                    id: v1(), title: action.title, status: TaskStatuses.New, addedDate: '',
                    deadline: '',
                    description: '',
                    order: 0,
                    startDate: '',
                    priority: TaskPriorities.Low, todoListId: action.todolistId
                }, ...state[action.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ?
                    {...t, status: action.status} : t)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ?
                    {...t, title: action.title} : t)
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
export const ChangeTaskStatus = (taskId: string, status: TaskStatuses, todolistId: string) => ({
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