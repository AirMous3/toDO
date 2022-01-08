import {
  TASKS_REDUCER_ADD_TASK,
  TASKS_REDUCER_CHANGE_TASK_ENTITY_STATUS,
  TASKS_REDUCER_REMOVE_TASK,
  TASKS_REDUCER_SET_TASKS,
  TASKS_REDUCER_UPDATE_TASK,
  TASKS_SAGA_UPDATE_TASK,
} from '../constants';
import { RequestStatusType } from '../../appReducer/appReducer';
import { UpdateTaskType } from '../../../../api/todolists-api';
import { TaskEntityType } from '../tasksReducer';

export const addTaskAC = (task: TaskEntityType) =>
  ({ type: TASKS_REDUCER_ADD_TASK, task } as const);

export const removeTask = (taskId: string, todolistId: string) =>
  ({
    type: TASKS_REDUCER_REMOVE_TASK,
    taskId,
    todolistId,
  } as const);

export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateTaskType) =>
  ({ type: TASKS_REDUCER_UPDATE_TASK, todolistId, taskId, model } as const);

export const setTasks = (tasks: TaskEntityType[], todolistId: string) =>
  ({
    type: TASKS_REDUCER_SET_TASKS,
    tasks,
    todolistId,
  } as const);

export const changeTaskEntityStatus = (
  todolistId: string,
  taskId: string,
  entityStatus: RequestStatusType,
) => ({ type: TASKS_REDUCER_CHANGE_TASK_ENTITY_STATUS, todolistId, entityStatus, taskId } as const);

export const updateTask = (todolistId: string, taskId: string, domainModel: UpdateTaskType) => ({
  type: TASKS_SAGA_UPDATE_TASK,
  todolistId,
  taskId,
  domainModel,
});
