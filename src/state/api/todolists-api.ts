import axios, { AxiosResponse } from 'axios';
import { TaskType } from '../redux/reducers/tasksReducer/tasksReducer';

let instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.1/`,
  withCredentials: true,
  headers: {
    'API-KEY': '1dbc4cf7-1f30-4d66-936b-be5fca3239ce',
  },
});

export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>(`todo-lists`);
  },
  createTodolist(title: string) {
    return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>(
      `todo-lists`,
      { title },
    );
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<{ title: string }, AxiosResponse<ResponseType>>(
      `todo-lists/${todolistId}`,
      { title },
    );
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
  createTask(todolistId: string, title: string) {
    return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(
      `todo-lists/${todolistId}/tasks`,
      { title },
    );
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
    return instance.put<UpdateTaskType, AxiosResponse<ResponseType<{ item: TaskType }>>>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      model,
    );
  },
};

export const authAPI = {
  login(payload: LoginPayloadType) {
    return instance.post<LoginPayloadType, AxiosResponse<ResponseType<{ userId: number }>>>(
      `auth/login`,
      payload,
    );
  },
  logOut() {
    return instance.delete<ResponseType>(`auth/login`);
  },
  authMe() {
    return instance.get<ResponseType<MeResponseType>>(`auth/me`);
  },
};

///////////////////////////// TYPE

export type MeResponseType = {
  id: number;
  email: string;
  login: string;
};

export type LoginPayloadType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type TodolistType = {
  addedDate: string;
  id: string;
  order: number;
  title: string;
};

export type ResponseType<T = {}> = {
  resultCode: number;
  messages: string[];
  fieldsErrors: string[];
  data: T;
};

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export type UpdateTaskType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};

export type GetTasksResponseType = {
  items: TaskType[];
  totalCount: number;
  error: string | null;
};
