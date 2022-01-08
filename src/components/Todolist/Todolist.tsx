import { DeleteOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../state/redux/store';
import { TaskEntityType } from '../../state/redux/reducers/tasksReducer/tasksReducer';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { EditableSpan } from '../EditableSpan/EditableSpan';
import s from './Todolist.module.css';
import { Task } from '../Task/Task';
import { TaskStatuses } from '../../state/api/todolists-api';
import { RequestStatusType } from '../../state/redux/reducers/appReducer/appReducer';
import { addTask, getTasks } from '../../state/redux/reducers/tasksReducer/sagas/actions';
import { changeTodolistFilter } from '../../state/redux/reducers/todolistsReducer/actions';
import {
  changeTodolistTitle,
  removeTodolist,
} from '../../state/redux/reducers/todolistsReducer/sagas/actions';

type TodolistPropsType = {
  todolistId: string;
  title: string;
  filter: string;
  entityStatus: RequestStatusType;
};

export const Todolist = React.memo(
  ({ todolistId, title, filter, entityStatus }: TodolistPropsType) => {
    let dispatch = useDispatch();
    let tasksForTodolist = useSelector<AppRootStateType, Array<TaskEntityType>>(
      (state) => state.tasks[todolistId],
    );

    const addTaskHandler = useCallback(
      (title: string) => dispatch(addTask(todolistId, title)),
      [todolistId, dispatch],
    );
    const changeTodolistTitleHandler = useCallback(
      (newTitle: string) => dispatch(changeTodolistTitle(todolistId, newTitle)),
      [dispatch, todolistId],
    );
    const removeTodolistHandler = useCallback(
      () => dispatch(removeTodolist(todolistId)),
      [dispatch, todolistId],
    );

    const onAllFilter = useCallback(
      () => dispatch(changeTodolistFilter(todolistId, 'all')),
      [todolistId, dispatch],
    );
    const onActiveFilter = useCallback(
      () => dispatch(changeTodolistFilter(todolistId, 'active')),
      [todolistId, dispatch],
    );
    const onCompletedFilter = useCallback(
      () => dispatch(changeTodolistFilter(todolistId, 'completed')),
      [todolistId, dispatch],
    );

    useEffect(() => {
      dispatch(getTasks(todolistId));
    }, [dispatch, todolistId]);

    if (filter === 'active') {
      tasksForTodolist = tasksForTodolist.filter((i) => i.status === TaskStatuses.New);
    }
    if (filter === 'completed') {
      tasksForTodolist = tasksForTodolist.filter((i) => i.status === TaskStatuses.Completed);
    }

    return (
      <div className={s.container}>
        <h3 className={s.span}>
          <div style={{ maxWidth: '250px', width: '250px', textAlign: 'center' }}>
            <EditableSpan
              entityStatus={entityStatus}
              title={title}
              onChangeCallBack={changeTodolistTitleHandler}
            />
          </div>
          <div className={s.deleteTodolistIcon}>
            <Button
              size={'small'}
              onClick={removeTodolistHandler}
              disabled={entityStatus === 'loading'}
            >
              <DeleteOutlined />
            </Button>
          </div>
        </h3>
        <AddItemForm addItemCallBack={addTaskHandler} disabled={entityStatus === 'loading'} />
        <div>
          {tasksForTodolist.map((t) => (
            <Task task={t} todolistId={todolistId} key={t.id} entityStatus={t.entityStatus} />
          ))}
        </div>
        <div className={s.status}>
          <Button
            size={'small'}
            variant={filter === 'all' ? 'contained' : 'text'}
            onClick={onAllFilter}
          >
            All
          </Button>

          <Button
            size={'small'}
            color={'primary'}
            variant={filter === 'active' ? 'contained' : 'text'}
            onClick={onActiveFilter}
          >
            Active
          </Button>

          <Button
            size={'small'}
            color={'warning'}
            variant={filter === 'completed' ? 'contained' : 'text'}
            onClick={onCompletedFilter}
          >
            Completed
          </Button>
        </div>
      </div>
    );
  },
);
