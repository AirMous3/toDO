import Grid from "@mui/material/Grid/Grid";
import Paper from "@mui/material/Paper/Paper";
import {Todolist} from "../Todolist/Todolist";
import React, {useCallback} from "react";
import {CreateTodolistThunk, TodolistDomainType} from "../../state/redux/todolists-Reducer";
import Container from "@mui/material/Container/Container";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/redux/store";
import {RequestStatusType} from "../../state/redux/app-Reducer";

type PropsType = {
    status: RequestStatusType
}
export const TodolistsList = (props: PropsType) => {
    let dispatch = useDispatch()
    const addNewTodolist = useCallback((title: string) => dispatch(CreateTodolistThunk(title)), [dispatch])


    let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    return <>
        <Container>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItemCallBack={addNewTodolist} disabled={props.status === 'loading'}/>
            </Grid>
            <Grid container spacing={1}>
                {todolists.map((tl) => {

                    return <Grid item>
                        <Paper style={{padding: "20px"}}>
                            <Todolist key={tl.id} todolistId={tl.id} title={tl.title} filter={tl.filter}
                                      entityStatus={tl.entityStatus}

                            />
                        </Paper>
                    </Grid>
                })}
            </Grid>
        </Container>

    </>
}