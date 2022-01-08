import {
  TODOLISTS_REDUCER_ADD_TODOLIST,
  TODOLISTS_REDUCER_CHANGE_TODOLIST_ENTITY_STATUS,
  TODOLISTS_REDUCER_CHANGE_TODOLIST_FILTER,
  TODOLISTS_REDUCER_CHANGE_TODOLIST_TITLE,
  TODOLISTS_REDUCER_REMOVE_TODOLIST,
  TODOLISTS_REDUCER_SET_TODOLISTS,
} from '../constants';
import { RequestStatusType } from '../../appReducer/appReducer';
import { FilterType, TodolistType } from '../todolistsReducer';

export const removeTodolistAC = (id: string) =>
  ({ type: TODOLISTS_REDUCER_REMOVE_TODOLIST, id } as const);

export const addTodolist = (title: string, payload: TodolistType) =>
  ({
    type: TODOLISTS_REDUCER_ADD_TODOLIST,
    title,
    payload,
  } as const);

export const changeTodolistTitleAC = (id: string, title: string) =>
  ({
    type: TODOLISTS_REDUCER_CHANGE_TODOLIST_TITLE,
    id,
    title,
  } as const);

export const changeTodolistFilter = (id: string, filter: FilterType) =>
  ({
    type: TODOLISTS_REDUCER_CHANGE_TODOLIST_FILTER,
    id,
    filter,
  } as const);

export const setTodolists = (todolists: Array<TodolistType>) =>
  ({
    type: TODOLISTS_REDUCER_SET_TODOLISTS,
    todolists,
  } as const);

export const changeTodolistEntityStatus = (todolistId: string, entityStatus: RequestStatusType) =>
  ({
    type: TODOLISTS_REDUCER_CHANGE_TODOLIST_ENTITY_STATUS,
    todolistId,
    entityStatus,
  } as const);
