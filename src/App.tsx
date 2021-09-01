import React from 'react';
import './App.css';
import Todolist from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {Container, Grid, Paper} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AddTodolist, TodolistsType} from "./state/todolists-Reducer";
import {AppRootStateType} from "./state/redux/store";


function App() {


    let dispatch = useDispatch()
    const addNewTodolist = (title: string) => dispatch(AddTodolist(title))
    let todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)


    return (
        <div className="App">
            <Container>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItemCallBack={addNewTodolist}/>
                </Grid>
                <Grid container spacing={1}>

                    {
                        todolists.map((tl) => {

                            return <Grid item>
                                <Paper style={{padding: "20px"}}>
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
