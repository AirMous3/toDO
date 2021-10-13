import {DeleteOutlined} from "@mui/icons-material";
import {Button} from "@mui/material";
import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/redux/store";
import {AddTaskThunk, GetTasksThunk, TaskType} from "../state/tasks-Reducer";
import {ChangeTodolistFilter, ChangeTodolistTitleThunk, RemoveTodolistThunk} from "../state/todolists-Reducer";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import s from './Todolist.module.css';
import {Task} from "./Task";
import {TaskStatuses} from "../state/api/todolists-api";


type TodolistPropsType = {
    todolistId: string
    title: string
    filter: string

}


export const Todolist = React.memo(({todolistId, title,filter}:TodolistPropsType) => {
        console.log('TODOLIST')

        let dispatch = useDispatch()
        let tasksForTodolist = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolistId])

        const addTask = useCallback((title: string) => dispatch(AddTaskThunk(todolistId, title)), [todolistId, dispatch])
        const changeTodolistTitle = useCallback((newTitle: string) => dispatch(ChangeTodolistTitleThunk(todolistId, newTitle)), [dispatch, todolistId])
        const removeTodolist = useCallback(() => dispatch(RemoveTodolistThunk(todolistId)), [dispatch, todolistId])

        const onAllFilter = useCallback(() => dispatch(ChangeTodolistFilter(todolistId, "all")), [todolistId, dispatch])
        const onActiveFilter = useCallback(() => dispatch(ChangeTodolistFilter(todolistId, "active")), [todolistId, dispatch])
        const onCompletedFilter = useCallback(() => dispatch(ChangeTodolistFilter(todolistId, "completed")), [todolistId, dispatch])

        useEffect(()=>{
            dispatch(GetTasksThunk(todolistId))
        },[dispatch,todolistId])

        if (filter === "active") {

            tasksForTodolist = tasksForTodolist.filter((i) => i.status === TaskStatuses.New)

        }
        if (filter === "completed") {

            tasksForTodolist = tasksForTodolist.filter(i => i.status === TaskStatuses.Completed)
        }


        return (
            <div className={s.container}>

                <h3 className={s.span}>
                    <div>
                        <EditableSpan title={title} onChangeCallBack={changeTodolistTitle}/>
                    </div>
                    <div className={s.deleteTodolistIcon}>
                        <Button size={"small"} onClick={removeTodolist}>
                            <DeleteOutlined/>
                        </Button>
                    </div>
                </h3>
                <AddItemForm addItemCallBack={addTask}/>
                <div>
                    {tasksForTodolist.map(t =>
                        <Task task={t} todolistId={todolistId} key={t.id}/>
                    )}
                </div>
                <div className={s.status}>
                    <Button size={"small"} variant={filter === "all" ? "contained" : "text"}
                            onClick={onAllFilter}>All</Button>
                    <Button size={"small"} color={"primary"} variant={filter === "active" ? "contained" : "text"}
                            onClick={onActiveFilter}>Active
                    </Button>
                    <Button size={"small"} color={"warning"} variant={filter === "completed" ? "contained" : "text"}
                            onClick={onCompletedFilter}>Completed
                    </Button>
                </div>
            </div>

        )
    }
)

