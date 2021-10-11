import {v1} from "uuid";



export const todolistId1 = v1()
export const todolistId2 = v1()

type ActionsType = ReturnType<typeof RemoveTodolist> | ReturnType<typeof AddTodolist> | ReturnType<typeof ChangeTodolistTitle> | ReturnType<typeof ChangeTodolistFilter>

export type FilterType = "all" | "completed" | "active"

export type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

export type TodolistDomainType = TodolistType & { filter: FilterType }

let initialState: Array<TodolistDomainType> = [
    {id: todolistId1, title: "What to Learn",  addedDate: '', order: 0, filter: "all"},
    {id: todolistId2, title: "What to buy",  addedDate: '', order: 0, filter: "all"},
]

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
        default:
            return state
    }
}



export const RemoveTodolist = (id: string) => ({type: "REMOVE-TODOLIST", id}) as const
export const AddTodolist = (title: string) => ({type: "ADD-TODOLIST", title , todolistId: v1() }) as const
export const ChangeTodolistTitle = (id: string, title: string) => ({type:"CHANGE-TODOLIST-TITLE" , id, title }) as const
export const ChangeTodolistFilter = (id: string, filter: FilterType) => ({type: "CHANGE-TODOLIST-FILTER", id, filter}) as const