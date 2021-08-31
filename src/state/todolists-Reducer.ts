import {TodolistsType} from "../App";
import {v1} from "uuid";
import {FilterType} from "../components/Todolist";



type StateType = TodolistsType[]
type ActionsType = ReturnType<typeof RemoveTodolist> | ReturnType<typeof AddTodolist> | ReturnType<typeof ChangeTodolistTitle> | ReturnType<typeof ChangeTodolistFilter>

export const todolistsReducer = (state:StateType, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(td => td.id != action.id)
        case "ADD-TODOLIST":
            return [...state, {id: v1() , title: action.title , filter: "all"}]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(td => td.id === action.id ? {id: td.id , title: action.title,filter: td.filter } : td)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(td => td.id === action.id ? {id: td.id , title: td.title , filter: action.filter } : td)
        default:
            return state
    }
}



export const RemoveTodolist = (id: string) => ({type: "REMOVE-TODOLIST", id}) as const
export const AddTodolist = (title: string) => ({type: "ADD-TODOLIST", title }) as const
export const ChangeTodolistTitle = (id: string, title: string) => ({type:"CHANGE-TODOLIST-TITLE" , id, title }) as const
export const ChangeTodolistFilter = (id: string, filter: FilterType) => ({type: "CHANGE-TODOLIST-FILTER", id, filter}) as const