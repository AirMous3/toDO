import {v1} from "uuid";
import {todolistsAPI} from "./api/todolists-api";
import {Dispatch} from "redux";
import {changeAppStatus} from "./app-Reducer";



export const todolistId1 = v1()
export const todolistId2 = v1()

type ActionsType = ReturnType<typeof RemoveTodolist>
    | ReturnType<typeof AddTodolist>
    | ReturnType<typeof ChangeTodolistTitle>
    | ReturnType<typeof ChangeTodolistFilter>
    | ReturnType<typeof SetTodolists>

export type FilterType = "all" | "completed" | "active"

export type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

export type TodolistDomainType = TodolistType & { filter: FilterType }

let initialState: Array<TodolistDomainType>  = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(td => td.id !== action.id)
        case "ADD-TODOLIST":
            return [{...action.payload, filter: "all"},...state ]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(td => td.id === action.id ? {...td, title: action.title } : td)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(td => td.id === action.id ? {...td, filter: action.filter} : td)
        case "SET-TODOLISTS":
            return  action.todolists.map(t => ({...t , filter: "all"}))

        default:
            return state
    }
}


///////////////////////// AC

export const RemoveTodolist = (id: string) => ({type: "REMOVE-TODOLIST", id}) as const
export const AddTodolist = (title: string, payload: TodolistType) => ({type: "ADD-TODOLIST", title , payload }) as const
export const ChangeTodolistTitle = (id: string, title: string) => ({type:"CHANGE-TODOLIST-TITLE" , id, title }) as const
export const ChangeTodolistFilter = (id: string, filter: FilterType) => ({type: "CHANGE-TODOLIST-FILTER", id, filter}) as const
export const SetTodolists = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists}) as const

////////////////////// THUNK

export const GetTodolistsThunk = () => (dispatch: Dispatch) => {
    dispatch(changeAppStatus('loading'))
    return todolistsAPI.getTodolists()
        .then((res)=>{
            dispatch(SetTodolists(res.data))
            dispatch(changeAppStatus('succeeded'))
    })
}

export const CreateTodolistThunk = (title: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatus('loading'))
    todolistsAPI.createTodolist(title).then( (res) => {
        let payload: TodolistType = res.data.data.item
        dispatch(AddTodolist(title,payload))
        dispatch(changeAppStatus('succeeded'))
    })
}

export const RemoveTodolistThunk = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatus('loading'))
    todolistsAPI.deleteTodolist(todolistId).then(()=> {
            dispatch(RemoveTodolist(todolistId))
            dispatch(changeAppStatus('succeeded'))
    })
}

export const ChangeTodolistTitleThunk = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(changeAppStatus('loading'))
    todolistsAPI.updateTodolist(todolistId,title).then(() => {
        dispatch(ChangeTodolistTitle(todolistId,title))
        dispatch(changeAppStatus('succeeded'))
    })
}
