import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './App.css';
import {AddItemForm,} from "./components/AddItemForm";
import {Header} from './components/AppBar';
import {AppRootStateType} from "./state/redux/store";
import {CreateTodolistThunk, GetTodolistsThunk, TodolistDomainType} from "./state/todolists-Reducer";
import {Todolist} from "./components/Todolist";
import LinearBuffer from "./components/Preloader";
import {RequestStatusType} from "./state/app-Reducer";
import ErrorBar from "./components/ErrorBar/ErrorBar";


function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>((state)=> state.app.status)

    console.log('APP RENDERED')
    let dispatch = useDispatch()
    const addNewTodolist = useCallback((title: string) => dispatch(CreateTodolistThunk(title)),[dispatch])
    let todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    useEffect(()=>{
        dispatch(GetTodolistsThunk())
    },[dispatch])

    return (
        <div className="App">
            <Header />
            <ErrorBar />
            {status === 'loading' && <LinearBuffer /> }
                <Container>

                <Grid container style={{ padding: "20px" }}>
                    <AddItemForm addItemCallBack={addNewTodolist} />
                </Grid>
                <Grid container spacing={1}>

                    {
                        todolists.map((tl) => {

                            return <Grid item>
                                <Paper style={{ padding: "20px" }}>
                                    <Todolist key={tl.id} todolistId={tl.id} title={tl.title} filter={tl.filter} entityStatus={tl.entityStatus}

                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default App;
