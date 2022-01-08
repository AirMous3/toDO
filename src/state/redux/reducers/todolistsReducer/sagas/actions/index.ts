import {
  TODOLISTS_SAGA_CHANGE_TODOLIST_TITLE,
  TODOLISTS_SAGA_CREATE_TODOLIST,
  TODOLISTS_SAGA_GET_TODOLISTS,
  TODOLISTS_SAGA_REMOVE_TODOLIST,
} from '../../constants';

export const getTodolists = () => ({ type: TODOLISTS_SAGA_GET_TODOLISTS });
export const createTodolist = (title: string) => ({
  type: TODOLISTS_SAGA_CREATE_TODOLIST,
  title,
});

export const removeTodolist = (todolistId: string) => ({
  type: TODOLISTS_SAGA_REMOVE_TODOLIST,
  todolistId,
});

export const changeTodolistTitle = (todolistId: string, title: string) => ({
  type: TODOLISTS_SAGA_CHANGE_TODOLIST_TITLE,
  todolistId,
  title,
});
