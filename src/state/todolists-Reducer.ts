import {v1} from "uuid";
import {todolistsAPI} from "./api/todolists-api";
import {Dispatch} from "redux";



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
            return [...state, {id: action.todolistId , title: action.title , addedDate: '', order: 0, filter: "all"}]
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
export const AddTodolist = (title: string) => ({type: "ADD-TODOLIST", title , todolistId: v1() }) as const
export const ChangeTodolistTitle = (id: string, title: string) => ({type:"CHANGE-TODOLIST-TITLE" , id, title }) as const
export const ChangeTodolistFilter = (id: string, filter: FilterType) => ({type: "CHANGE-TODOLIST-FILTER", id, filter}) as const
export const SetTodolists = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists}) as const

////////////////////// THUNK

export const GetTodolistsThunk = () => (dispatch: Dispatch) => {
    return todolistsAPI.getTodolists()
        .then((res)=>{
        dispatch(SetTodolists(res.data))
    })
}