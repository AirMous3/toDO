import axios, {AxiosResponse} from "axios";

let instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1`,
    withCredentials: true,
    headers: {
        'API-KEY': '1dbc4cf7-1f30-4d66-936b-be5fca3239ce'
    }
})


export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>(`/todo-lists`)
    },
    createTodolist(title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>(`/todo-lists`, {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<{ title: string }, AxiosResponse<ResponseType>>(`/todo-lists/${todolistId}`, {title})
    }
}

///////////////////////////// TYPE
type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: string[],
    fieldsErrors: string[],
    data: T
}

