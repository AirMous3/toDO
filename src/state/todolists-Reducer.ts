import {v1} from "uuid";
import {FilterType} from "../components/Todolist";


export const todolistId1 = v1()
export const todolistId2 = v1()

type ActionsType = ReturnType<typeof RemoveTodolist> | ReturnType<typeof AddTodolist> | ReturnType<typeof ChangeTodolistTitle> | ReturnType<typeof ChangeTodolistFilter>


export type TodolistsType = {
    id: string
    title: string
    filter: string
}
type StateType = TodolistsType[]

let initialState: StateType = [
    {id: todolistId1, title: "What to Learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"},
]

export const todolistsReducer = (state = initialState, action: ActionsType): StateType => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(td => td.id != action.id)
        case "ADD-TODOLIST":
            return [...state, {id: action.todolistId , title: action.title , filter: "all"}]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(td => td.id === action.id ? {id: td.id , title: action.title,filter: td.filter } : td)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(td => td.id === action.id ? {id: td.id , title: td.title , filter: action.filter } : td)
        default:
            return state
    }
}



export const RemoveTodolist = (id: string) => ({type: "REMOVE-TODOLIST", id}) as const
export const AddTodolist = (title: string) => ({type: "ADD-TODOLIST", title , todolistId: v1() }) as const
export const ChangeTodolistTitle = (id: string, title: string) => ({type:"CHANGE-TODOLIST-TITLE" , id, title }) as const
export const ChangeTodolistFilter = (id: string, filter: FilterType) => ({type: "CHANGE-TODOLIST-FILTER", id, filter}) as const