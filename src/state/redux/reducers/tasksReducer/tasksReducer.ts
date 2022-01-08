import { TaskPriorities, TaskStatuses } from '../../../api/todolists-api';
import { RequestStatusType } from '../appReducer/appReducer';
import {
  TASKS_REDUCER_ADD_TASK,
  TASKS_REDUCER_CHANGE_TASK_ENTITY_STATUS,
  TASKS_REDUCER_REMOVE_TASK,
  TASKS_REDUCER_SET_TASKS,
  TASKS_REDUCER_UPDATE_TASK,
} from './constants';
import { addTaskAC, changeTaskEntityStatus, removeTask, setTasks, updateTaskAC } from './actions';
import {
  TODOLISTS_REDUCER_ADD_TODOLIST,
  TODOLISTS_REDUCER_REMOVE_TODOLIST,
  TODOLISTS_REDUCER_SET_TODOLISTS,
} from '../todolistsReducer/constants';
import { addTodolist, removeTodolistAC, setTodolists } from '../todolistsReducer/actions';

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
  | ReturnType<typeof addTodolist>
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof setTodolists>
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

    case TODOLISTS_REDUCER_ADD_TODOLIST:
      return { ...state, [action.payload.id]: [] };

    case TODOLISTS_REDUCER_REMOVE_TODOLIST:
      let copyState = { ...state };
      delete copyState[action.id];
      return copyState;

    case TODOLISTS_REDUCER_SET_TODOLISTS: {
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
