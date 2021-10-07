import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';
import Paper from '@mui/material/Paper/Paper';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import { AddItemForm } from "./components/AddItemForm";
import { Header } from './components/AppBar';
import Todolist from "./components/Todolist";
import { AppRootStateType } from "./state/redux/store";
import { AddTodolist, TodolistsType } from "./state/todolists-Reducer";


function App() {


    let dispatch = useDispatch()
    const addNewTodolist = (title: string) => dispatch(AddTodolist(title))
    let todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)


    return (
        <div className="App">
            <Header />
            <Container>

                <Grid container style={{ padding: "20px" }}>
                    <AddItemForm addItemCallBack={addNewTodolist} />
                </Grid>
                <Grid container spacing={1}>

                    {
                        todolists.map((tl) => {

                            return <Grid item>
                                <Paper style={{ padding: "20px" }}>
                                    <Todolist key={tl.id} todolistId={tl.id} title={tl.title} filter={tl.filter}

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
