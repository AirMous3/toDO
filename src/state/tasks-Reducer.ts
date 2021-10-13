import {AddTodolist, RemoveTodolist, SetTodolists} from "./todolists-Reducer";
import {TaskPriorities, TaskStatuses, todolistsAPI, UpdateTaskType} from "./api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./redux/store";


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
    | ReturnType<typeof SetTodolists>
    | ReturnType<typeof SetTasks>

//////////////////////////////////////

let initialState: TasksStateType = {

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":

            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}

        case "ADD-TASK":
            return {...state, [action.task.todoListId]: [action.task , ...state[action.task.todoListId]]}
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
        case "SET-TODOLISTS":{
            let copyState = {...state}
            action.todolists.forEach(t => copyState[t.id] = [])
            return  copyState
        }
        case "SET-TASKS":{
            let copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        default:
            return state
    }
}

//////////////////////////////// AC
export const AddTask = ( task: TaskType) => ({type: "ADD-TASK", task}) as const
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

export const SetTasks = (tasks: TaskType[], todolistId: string) => ({type: 'SET-TASKS', tasks , todolistId}) as const

////////////////////////// THUNK

export const GetTasksThunk = (todolistId: string) => (dispatch: Dispatch) => {
    return todolistsAPI.getTasks(todolistId).then((res)=> {
        let tasks = res.data.items
        dispatch(SetTasks(tasks , todolistId))
    })
}
export const DeleteTaskThunk = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTask(todolistId, taskId).then( () => {
        dispatch(RemoveTask(taskId,todolistId))
    })
}

export const AddTaskThunk = (todolistId: string,title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTask(todolistId,title).then((res)=>{
        if(res.data.resultCode === 0){
         let task = res.data.data.item
            console.log(task)
         dispatch(AddTask(task))
        }
    })
}
export const ChangeTaskTitleThunk = (todolistId: string, taskId: string , title: string) => (dispatch: Dispatch, getState: ()=> AppRootStateType) => {
    let currentTask = getState().tasks[todolistId].find((t)=> t.id === taskId) //Достаём нужную таску
    if(currentTask){
        let model: UpdateTaskType = {
            title: title,
            description: currentTask.description,
            status: currentTask.status,
            priority: currentTask.priority,
            startDate: currentTask.startDate,
            deadline: currentTask.deadline,
        }
        todolistsAPI.updateTask(todolistId,taskId,model).then((res) => {
            if (res.data.resultCode === 0){
                let taskTitle = res.data.data.item.title
                dispatch(ChangeTaskTitle(taskId, taskTitle, todolistId))
            }
        })
    }


}