import {AddTodolist, changeTodolistEntityStatus, RemoveTodolist, SetTodolists} from "./todolists-Reducer";
import {TaskPriorities, TaskStatuses, todolistsAPI, UpdateTaskType} from "./api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./redux/store";
import {changeAppStatus, RequestStatusType, setAppError} from "./app-Reducer";


///////////////////////// TYPE
export type TasksStateType = {
    [key: string]: Array<TaskEntityType>
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
export type TaskEntityType = TaskType & {entityStatus: RequestStatusType}

type ActionsType =
    ReturnType<typeof AddTask>
    | ReturnType<typeof RemoveTask>
    | ReturnType<typeof AddTodolist>
    | ReturnType<typeof RemoveTodolist>
    | ReturnType<typeof SetTodolists>
    | ReturnType<typeof SetTasks>
    | ReturnType<typeof UpdateTask>
    | ReturnType<typeof ChangeTaskEntityStatus>

//////////////////////////////////////

let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}

        case "ADD-TASK": {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}

        }
        case "UPDATE-TASK":
            return {...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)}

        case "ADD-TODOLIST":
            return {...state, [action.payload.id]: []}
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        case "SET-TODOLISTS": {
            let copyState = {...state}
            action.todolists.forEach(t => copyState[t.id] = [])
            return copyState
        }
        case "CHANGE-TASK-ENTITY-STATUS":
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map((t) => t.id === action.taskId ? {...t, entityStatus: action.entityStatus}: t)
            }
        case "SET-TASKS": {
            let copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        default:
            return state
    }
}

//////////////////////////////// AC
export const AddTask = (task: TaskEntityType) => ({type: "ADD-TASK", task}) as const
export const RemoveTask = (taskId: string, todolistId: string) => ({type: "REMOVE-TASK", taskId, todolistId}) as const
export const UpdateTask = (todolistId: string, taskId: string, model: UpdateTaskType) =>
    ({type: 'UPDATE-TASK', todolistId, taskId, model}) as const

export const SetTasks = (tasks: TaskEntityType[], todolistId: string) => ({type: 'SET-TASKS', tasks, todolistId}) as const
export const ChangeTaskEntityStatus = (todolistId: string, taskId: string, entityStatus: RequestStatusType) =>
    ({type: 'CHANGE-TASK-ENTITY-STATUS', todolistId , entityStatus, taskId}) as const


////////////////////////// THUNK

export const GetTasksThunk = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatus('loading'))
    return todolistsAPI.getTasks(todolistId).then((res) => {
        let tasks = res.data.items.map((t)=> ({...t, entityStatus: 'idle' as RequestStatusType})) /*Добавляем такске ЭнтитиСтатус*/
        dispatch(SetTasks(tasks, todolistId))
        dispatch(changeAppStatus('succeeded'))
    })
}
export const DeleteTaskThunk = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatus('loading'))
    dispatch(ChangeTaskEntityStatus(todolistId,taskId, 'loading'))
    todolistsAPI.deleteTask(todolistId, taskId).then(() => {
        dispatch(RemoveTask(taskId, todolistId))
        dispatch(changeAppStatus('succeeded'))
    })
}

export const AddTaskThunk = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatus('loading'))
    dispatch(changeTodolistEntityStatus(todolistId, 'loading'))
    todolistsAPI.createTask(todolistId, title).then((res) => {
        if (res.data.resultCode === 0) {
            let task = {...res.data.data.item, entityStatus: 'idle' as RequestStatusType} /*Добавляем такске ЭнтитиСтатус*/
            dispatch(AddTask(task))
            dispatch(changeAppStatus('succeeded'))
            dispatch(changeTodolistEntityStatus(todolistId, 'idle'))
        } else {
            if (res.data.messages.length > 0) {
                dispatch(setAppError(res.data.messages[0]))
                dispatch(changeAppStatus('succeeded'))
                dispatch(changeTodolistEntityStatus(todolistId, 'idle'))
            } else {
                dispatch(setAppError('some error'))
                dispatch(changeAppStatus('succeeded'))
                dispatch(changeTodolistEntityStatus(todolistId, 'idle'))
            }
        }
    })
}

export const UpdateTaskThunk = (todolistId: string, taskId: string, domainModel: UpdateTaskType) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(changeAppStatus('loading'))
        dispatch(ChangeTaskEntityStatus(todolistId,taskId, 'loading'))
        let currentTask = getState().tasks[todolistId].find((t) => t.id === taskId) //Достаём нужную таску
        if (currentTask) {
            let model: UpdateTaskType = {
                title: currentTask.title,
                description: currentTask.description,
                status: currentTask.status,
                priority: currentTask.priority,
                startDate: currentTask.startDate,
                deadline: currentTask.deadline,
                ...domainModel
            }

            todolistsAPI.updateTask(todolistId, taskId, model).then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(UpdateTask(todolistId, taskId, model))
                    dispatch(changeAppStatus('succeeded'))
                    dispatch(ChangeTaskEntityStatus(todolistId,taskId, 'succeeded'))
                }
            })

        } else {
            console.warn('task not found in state')
        }

    }