import { v1 } from 'uuid';
import { todolistsAPI } from '../../api/todolists-api';
import { Dispatch } from 'redux';
import { RequestStatusType } from './appReducer/appReducer';
import { setAppError, setAppStatus } from './appReducer/actions/appActions';

export const todolistId1 = v1();
export const todolistId2 = v1();

type ActionsType =
  | ReturnType<typeof RemoveTodolist>
  | ReturnType<typeof AddTodolist>
  | ReturnType<typeof ChangeTodolistTitle>
  | ReturnType<typeof ChangeTodolistFilter>
  | ReturnType<typeof SetTodolists>
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
    case 'REMOVE-TODOLIST':
      return state.filter((td) => td.id !== action.id);
    case 'ADD-TODOLIST':
      return [{ ...action.payload, filter: 'all', entityStatus: 'idle' }, ...state];
    case 'CHANGE-TODOLIST-TITLE':
      return state.map((td) => (td.id === action.id ? { ...td, title: action.title } : td));
    case 'CHANGE-TODOLIST-FILTER':
      return state.map((td) => (td.id === action.id ? { ...td, filter: action.filter } : td));
    case 'SET-TODOLISTS':
      return action.todolists.map((t) => ({ ...t, filter: 'all', entityStatus: 'idle' }));
    case 'CHANGE-TODOLIST-ENTITY-STATUS':
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

///////////////////////// AC

export const RemoveTodolist = (id: string) => ({ type: 'REMOVE-TODOLIST', id } as const);
export const AddTodolist = (title: string, payload: TodolistType) =>
  ({
    type: 'ADD-TODOLIST',
    title,
    payload,
  } as const);
export const ChangeTodolistTitle = (id: string, title: string) =>
  ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    title,
  } as const);
export const ChangeTodolistFilter = (id: string, filter: FilterType) =>
  ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter,
  } as const);
export const SetTodolists = (todolists: Array<TodolistType>) =>
  ({
    type: 'SET-TODOLISTS',
    todolists,
  } as const);
export const changeTodolistEntityStatus = (todolistId: string, entityStatus: RequestStatusType) =>
  ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    todolistId,
    entityStatus,
  } as const);
////////////////////// THUNK

export const GetTodolistsThunk = () => (dispatch: Dispatch) => {
  dispatch(setAppStatus('loading')); /*Подключаем прелоадер*/
  todolistsAPI
    .getTodolists()
    .then((res) => {
      dispatch(SetTodolists(res.data));
      dispatch(setAppStatus('succeeded')); /*ВЫключаем прелоадер*/
    })
    .catch((error) => {
      dispatch(setAppError(error.message)); /*Диспатчим ошибку*/
      dispatch(setAppStatus('failed'));
    });
};

export const CreateTodolistThunk = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus('loading'));
  todolistsAPI.createTodolist(title).then((res) => {
    if (res.data.resultCode === 0) {
      let payload: TodolistType = res.data.data.item;
      dispatch(AddTodolist(title, payload));
      dispatch(setAppStatus('succeeded'));
    } else {
      if (res.data.messages.length > 0) {
        dispatch(setAppError(res.data.messages[0]));
        dispatch(setAppStatus('succeeded'));
      } else {
        dispatch(setAppError('some error'));
        dispatch(setAppStatus('succeeded'));
      }
    }
  });
};

export const RemoveTodolistThunk = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatus('loading'));
  dispatch(changeTodolistEntityStatus(todolistId, 'loading'));
  todolistsAPI.deleteTodolist(todolistId).then(() => {
    dispatch(RemoveTodolist(todolistId));
    dispatch(setAppStatus('succeeded'));
  });
};

export const ChangeTodolistTitleThunk =
  (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'));
    dispatch(changeTodolistEntityStatus(todolistId, 'loading'));
    todolistsAPI.updateTodolist(todolistId, title).then(() => {
      dispatch(ChangeTodolistTitle(todolistId, title));
      dispatch(setAppStatus('succeeded'));
      dispatch(changeTodolistEntityStatus(todolistId, 'succeeded'));
    });
  };
