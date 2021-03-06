import React, { ChangeEvent, useCallback } from 'react';
import { TaskType } from '../../state/redux/reducers/tasksReducer/tasksReducer';
import s from '../Todolist/Todolist.module.css';
import { Button, Checkbox } from '@mui/material';
import { EditableSpan } from '../EditableSpan/EditableSpan';
import { HighlightOffOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { TaskStatuses } from '../../state/api/todolists-api';
import { RequestStatusType } from '../../state/redux/reducers/appReducer/appReducer';
import { deleteTask } from '../../state/redux/reducers/tasksReducer/sagas/actions';
import { updateTask } from '../../state/redux/reducers/tasksReducer/actions';

type PropsTaskType = {
  task: TaskType;
  todolistId: string;
  entityStatus: RequestStatusType;
};
export const Task = React.memo(({ task, todolistId, entityStatus }: PropsTaskType) => {
  let dispatch = useDispatch();
  const onDeleteHandler = () => dispatch(deleteTask(task.id, todolistId)); // удаление таски
  const onIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateTask(task.todoListId, task.id, {
        status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New,
      }),
    ); /*смена статуса таски ,  если чекд true - тогда Completed иначе New*/
  };
  const onChangeTaskTitle = useCallback(
    (newTitle: string) => {
      dispatch(updateTask(todolistId, task.id, { title: newTitle })); // смена имени таски
    },
    [dispatch, task.id, todolistId],
  );

  return (
    <div
      className={`${s.tasks} ${task.status === TaskStatuses.Completed ? s.isDone : ''}`}
      key={task.id}
    >
      {' '}
      {/*Если ТаскСтатус = Комплетед - тогда навешивается стиль, иначе пустая строка*/}
      <Checkbox
        disabled={entityStatus === 'loading'}
        size={'small'}
        checked={task.status === TaskStatuses.Completed}
        onChange={onIsDoneHandler}
      />{' '}
      {/*Если ТаскСтатус = Комплетед, тогда значение Checked будет true */}
      <div style={{ maxWidth: '250px', minWidth: '250px' }}>
        <EditableSpan
          entityTaskStatus={entityStatus}
          title={task.title}
          onChangeCallBack={onChangeTaskTitle}
        />
      </div>
      <div>
        <Button disabled={entityStatus === 'loading'} size={'small'} onClick={onDeleteHandler}>
          <HighlightOffOutlined />
        </Button>
      </div>
    </div>
  );
});
