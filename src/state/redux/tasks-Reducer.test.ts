import {
  AddTask,
  ChangeTaskStatus,
  ChangeTaskTitle,
  RemoveTask,
  tasksReducer,
  TasksStateType,
} from './reducers/tasks-Reducer';
import { AddTodolist, RemoveTodolist, todolistId1 } from './reducers/todolists-Reducer';
import { TaskPriorities, TaskStatuses } from '../api/todolists-api';

let startState: TasksStateType = {};

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: '1',
        title: 'css',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        startDate: '',
        priority: TaskPriorities.Low,
        todoListId: todolistId1,
      },
      {
        id: '2',
        title: 'js',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        startDate: '',
        priority: TaskPriorities.Low,
        todoListId: todolistId1,
      },
      {
        id: '3',
        title: 'react',
        status: TaskStatuses.Completed,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        startDate: '',
        priority: TaskPriorities.Low,
        todoListId: todolistId1,
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        startDate: '',
        priority: TaskPriorities.Low,
        todoListId: todolistId1,
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatuses.Completed,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        startDate: '',
        priority: TaskPriorities.Low,
        todoListId: todolistId1,
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.Completed,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        startDate: '',
        priority: TaskPriorities.Low,
        todoListId: todolistId1,
      },
    ],
  };
});

test('correct task should be deleted from correct array', () => {
  const action = RemoveTask('2', 'todolistId2');

  const endState = tasksReducer(startState, action);

  expect(endState).toEqual({
    todolistId1: [
      {
        id: '1',
        title: 'css',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        startDate: '',
        priority: TaskPriorities.Low,
        todoListId: todolistId1,
      },
      {
        id: '2',
        title: 'js',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        startDate: '',
        priority: TaskPriorities.Low,
        todoListId: todolistId1,
      },
      {
        id: '3',
        title: 'react',
        status: TaskStatuses.Completed,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        startDate: '',
        priority: TaskPriorities.Low,
        todoListId: todolistId1,
      },
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        startDate: '',
        priority: TaskPriorities.Low,
        todoListId: todolistId1,
      },

      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.Completed,
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        startDate: '',
        priority: TaskPriorities.Low,
        todoListId: todolistId1,
      },
    ],
  });
});

test('correct task should be added to correct array', () => {
  const action = AddTask('juce', 'todolistId2');
  const endState = tasksReducer(startState, action);

  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(4);
  expect(endState['todolistId2'][0].id).toBeDefined();
  expect(endState['todolistId2'][0].title).toBe('juce');
  expect(endState['todolistId2'][0].status).toBe(TaskStatuses.New);
});

test('status of specified task should be changed', () => {
  const action = ChangeTaskStatus('2', TaskStatuses.New, 'todolistId2');
  const endState = tasksReducer(startState, action);

  expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
  expect(endState['todolistId2'][1].title).toBe('milk');
});

test('title of specified task should be changed', () => {
  const action = ChangeTaskTitle('3', 'vodka', 'todolistId2');
  const endState = tasksReducer(startState, action);

  expect(endState['todolistId2'][2].status).toBe(TaskStatuses.Completed);
  expect(endState['todolistId2'][2].title).toBe('vodka');
});

test('new array should be added when new todolist is added', () => {
  const action = AddTodolist('new todolist');
  const endState = tasksReducer(startState, action);
  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != 'todolistId1' && k != 'todolistId2');
  if (!newKey) {
    throw Error('new key should be added');
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
  const action = RemoveTodolist('todolistId2');
  const endState = tasksReducer(startState, action);
  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState['todolistId2']).not.toBeDefined();
});
