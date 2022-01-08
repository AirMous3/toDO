import { TASKS_SAGA_ADD_TASK, TASKS_SAGA_DELETE_TASK, TASKS_SAGA_GET_TASKS } from '../../constants';

export const getTasks = (todolistId: string) => ({ type: TASKS_SAGA_GET_TASKS, todolistId });

export const deleteTask = (taskId: string, todolistId: string) => ({
  type: TASKS_SAGA_DELETE_TASK,
  taskId,
  todolistId,
});

export const addTask = (todolistId: string, title: string) => ({
  type: TASKS_SAGA_ADD_TASK,
  todolistId,
  title,
});
