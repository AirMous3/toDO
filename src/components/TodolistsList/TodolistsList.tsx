import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import { Todolist } from '../Todolist/Todolist';
import React, { useCallback, useEffect } from 'react';
import { TodolistDomainType } from '../../state/redux/reducers/todolistsReducer/todolistsReducer';
import { AddItemForm } from '../AddItemForm/AddItemForm';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../state/redux/store';
import { RequestStatusType } from '../../state/redux/reducers/appReducer/appReducer';
import { Redirect } from 'react-router-dom';
import {
  createTodolist,
  getTodolists,
} from '../../state/redux/reducers/todolistsReducer/sagas/actions';

type PropsType = {
  status: RequestStatusType;
};
export const TodolistsList = (props: PropsType) => {
  let dispatch = useDispatch();
  const addNewTodolist = useCallback(
    (title: string) => dispatch(createTodolist(title)),
    [dispatch],
  );
  const isLoggedIn = useSelector((state: AppRootStateType) => state.login.isLogged);
  let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    (state) => state.todolists,
  );
  useEffect(() => {
    dispatch(getTodolists()); /*Получение тудулистов*/
  }, [dispatch]);

  if (!isLoggedIn) {
    return (
      <Redirect to={'/login'} />
    ); /*После инициализации, если мы не залогинены, сделает редирект на логин*/
  }

  return (
    <>
      <Grid container style={{ padding: '20px' }} justifyContent={'center'}>
        <AddItemForm addItemCallBack={addNewTodolist} disabled={props.status === 'loading'} />
      </Grid>
      <Grid container spacing={2} justifyContent={'center'}>
        {todolists.map((tl) => {
          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: '20px' }}>
                <Todolist
                  todolistId={tl.id}
                  title={tl.title}
                  filter={tl.filter}
                  entityStatus={tl.entityStatus}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
