import { v1 } from 'uuid';
import { RequestStatusType } from '../appReducer/appReducer';
import {
  TODOLISTS_REDUCER_ADD_TODOLIST,
  TODOLISTS_REDUCER_CHANGE_TODOLIST_ENTITY_STATUS,
  TODOLISTS_REDUCER_CHANGE_TODOLIST_FILTER,
  TODOLISTS_REDUCER_CHANGE_TODOLIST_TITLE,
  TODOLISTS_REDUCER_REMOVE_TODOLIST,
  TODOLISTS_REDUCER_SET_TODOLISTS,
} from './constants';
import {
  addTodolist,
  changeTodolistEntityStatus,
  changeTodolistFilter,
  changeTodolistTitleAC,
  removeTodolistAC,
  setTodolists,
} from './actions';

export const todolistId1 = v1();
export const todolistId2 = v1();

type ActionsType =
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof addTodolist>
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilter>
  | ReturnType<typeof setTodolists>
  | ReturnType<typeof changeTodolistEntityStatus>;

export type FilterType = 'all' | 'completed' | 'active';

export type TodolistType = {
  addedDate: string;
  id: string;
  order: number;
  title: string;
};

export type TodolistDomainType = TodolistType & {
  filter: FilterType;
  entityStatus: RequestStatusType;
};

let initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (
  state: Array<TodolistDomainType> = initialState,
  action: ActionsType,
): Array<TodolistDomainType> => {
  switch (action.type) {
    case TODOLISTS_REDUCER_REMOVE_TODOLIST:
      return state.filter((td) => td.id !== action.id);
    case TODOLISTS_REDUCER_ADD_TODOLIST:
      return [{ ...action.payload, filter: 'all', entityStatus: 'idle' }, ...state];
    case TODOLISTS_REDUCER_CHANGE_TODOLIST_TITLE:
      return state.map((td) => (td.id === action.id ? { ...td, title: action.title } : td));
    case TODOLISTS_REDUCER_CHANGE_TODOLIST_FILTER:
      return state.map((td) => (td.id === action.id ? { ...td, filter: action.filter } : td));
    case TODOLISTS_REDUCER_SET_TODOLISTS:
      return action.todolists.map((t) => ({ ...t, filter: 'all', entityStatus: 'idle' }));
    case TODOLISTS_REDUCER_CHANGE_TODOLIST_ENTITY_STATUS:
      return state.map((td) =>
        td.id === action.todolistId
          ? {
              ...td,
              entityStatus: action.entityStatus,
            }
          : td,
      );
    default:
      return state;
  }
};
