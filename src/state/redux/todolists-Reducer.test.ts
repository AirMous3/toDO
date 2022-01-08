import { v1 } from 'uuid';
import {
  addTodolist,
  changeTodolistFilter,
  changeTodolistTitle,
  FilterType,
  removeTodolist,
  TodolistDomainType,
  todolistsReducer,
} from './reducers/todolistsReducer/todolistsReducer';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];
let newTodolistTitle: string;

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    { id: todolistId1, title: 'What to Learn', addedDate: '', order: 0, filter: 'all' },
    { id: todolistId2, title: 'What to buy', addedDate: '', order: 0, filter: 'all' },
  ];
  newTodolistTitle = 'New Todolist';
});

test('correct todolist should be removed', () => {
  const endState = todolistsReducer(startState, removeTodolist(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  const endState = todolistsReducer(startState, addTodolist(newTodolistTitle));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
  expect(endState[2].filter).toBe('all');
});

test('correct todolist should change its name', () => {
  const endState = todolistsReducer(startState, changeTodolistTitle(todolistId2, newTodolistTitle));

  expect(endState[0].title).toBe('What to Learn');
  expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
  let newFilter: FilterType = 'completed';
  const endState = todolistsReducer(startState, changeTodolistFilter(todolistId2, newFilter));

  expect(endState[0].filter).toBe('all');
  expect(endState[1].filter).toBe(newFilter);
});
