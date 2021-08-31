import {TodolistsType} from "../App";



type StateType = TodolistsType[]
type ActionsType = ReturnType<typeof removeTodolist>

export const todolistsReducer = (state:StateType, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return [...state.filter(td => td.id != action.id)]
        default:
            return state
    }
}


export const removeTodolist = (id: string) => ({type: "REMOVE-TODOLIST", id}) as const
