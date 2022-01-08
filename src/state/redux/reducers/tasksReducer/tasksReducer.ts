import { AddTodolist, RemoveTodolist, SetTodolists } from '../todolists-Reducer';
import {
  TaskPriorities,
  TaskStatuses,
  todolistsAPI,
  UpdateTaskType,
} from '../../../api/todolists-api';
import { Dispatch } from 'redux';
import { AppRootStateType } from '../../store';
import { RequestStatusType } from '../appReducer/appReducer';
import { setAppError, setAppStatus } from '../appReducer/actions';
import {
  TASKS_REDUCER_ADD_TASK,
  TASKS_REDUCER_CHANGE_TASK_ENTITY_STATUS,
  TASKS_REDUCER_REMOVE_TASK,
  TASKS_REDUCER_SET_TASKS,
  TASKS_REDUCER_UPDATE_TASK,
} from './constants';
import {
  addTaskAC,
  changeTaskEntityStatus,
  removeTask,
  setTasks,
  updateTaskAC,
} from './actions/tasksActions';

///////////////////////// TYPE
export type TasksStateType = {
  [key: string]: Array<TaskEntityType>;
};

export type TaskType = {
  id: string;
  title: string;
  description: string;
  todoListId: string;
  order: number;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  addedDate: string;
};
export type TaskEntityType = TaskType & { entityStatus: RequestStatusType };

type ActionsType =
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof removeTask>
  | ReturnType<typeof AddTodolist>
  | ReturnType<typeof RemoveTodolist>
  | ReturnType<typeof SetTodolists>
  | ReturnType<typeof setTasks>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof changeTaskEntityStatus>;

//////////////////////////////////////

let initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType,
): TasksStateType => {
  switch (action.type) {
    case TASKS_REDUCER_REMOVE_TASK:
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter((t) => t.id !== action.taskId),
      };

    case TASKS_REDUCER_ADD_TASK: {
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]],
      };
    }
    case TASKS_REDUCER_UPDATE_TASK:
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, ...action.model } : t,
        ),
      };

    case 'ADD-TODOLIST':
      return { ...state, [action.payload.id]: [] };
    case 'REMOVE-TODOLIST':
      let copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    case 'SET-TODOLISTS': {
      let copyState = { ...state };
      action.todolists.forEach((t) => (copyState[t.id] = []));
      return copyState;
    }
    case TASKS_REDUCER_CHANGE_TASK_ENTITY_STATUS:
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((t) =>
          t.id === action.taskId ? { ...t, entityStatus: action.entityStatus } : t,
        ),
      };
    case TASKS_REDUCER_SET_TASKS: {
      let copyState = { ...state };
      copyState[action.todolistId] = action.tasks;
      return copyState;
    }
    default:
      return state;
  }
};
