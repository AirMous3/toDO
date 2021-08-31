import React from 'react';
import './App.css';
import Todolist, {FilterType} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {Container, Grid, Paper} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AddTask, ChangeTaskStatus, ChangeTaskTitle, RemoveTask, TasksStateType, TaskType} from "./state/tasks-Reducer";
import {
    AddTodolist,
    ChangeTodolistFilter,
    ChangeTodolistTitle,
    RemoveTodolist,
    TodolistsType
} from "./state/todolists-Reducer";
import {AppRootStateType} from "./state/redux/store";


function App() {


    let dispatch = useDispatch()

    const addTask = (title: string, todolistId: string) => dispatch(AddTask(title, todolistId))
    const deleteTask = (id: string, todolistId: string) => dispatch(RemoveTask(id, todolistId))
    const changeTaskTitle = (taskId: string, todolistId: string, newTitle: string) => dispatch(ChangeTaskTitle(taskId, newTitle, todolistId))
    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => dispatch(ChangeTaskStatus(taskId, isDone, todolistId))
    const changeFilter = (value: FilterType, todolistId: string) => dispatch(ChangeTodolistFilter(todolistId, value))
    const deleteTodolist = (todolistId: string) => dispatch(RemoveTodolist(todolistId))
    const addNewTodolist = (title: string) => dispatch(AddTodolist(title))
    const changeTodolistTile = (todolistId: string, newTitle: string) => dispatch(ChangeTodolistTitle(todolistId,newTitle))
    let todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
    let tasksForTodolist = useSelector<AppRootStateType,TasksStateType>(state => state.tasks)

    return (
        <div className="App">
            <Container>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItemCallBack={addNewTodolist}/>
                </Grid>
                <Grid container spacing={1}>

                    {
                        todolists.map((tl) => {
                            let tasks: Array<TaskType> = tasksForTodolist[tl.id]

                            if (tl.filter === "active") {
                                tasks = tasks.filter(i => !i.isDone)

                            }
                            if (tl.filter === "completed") {
                                tasks = tasks.filter(i => i.isDone)

                            }
                            return <Grid item>
                                <Paper style={{padding: "20px"}}>
                                    <Todolist key={tl.id} todolistId={tl.id} title={tl.title} tasks={tasks}
                                              deleteTask={deleteTask}
                                              changeFilter={changeFilter} addTask={addTask}
                                              changeTaskStatus={changeStatus}
                                              filter={tl.filter} deleteTodolist={deleteTodolist}
                                              changeTaskTitle={changeTaskTitle}
                                              changeTodolistTile={changeTodolistTile}
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
