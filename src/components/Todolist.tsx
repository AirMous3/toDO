import {DeleteOutlined} from "@mui/icons-material";
import {Button} from "@mui/material";
import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/redux/store";
import {AddTask, GetTasks, SetTasks, TaskType} from "../state/tasks-Reducer";
import {ChangeTodolistFilter, ChangeTodolistTitle, RemoveTodolist} from "../state/todolists-Reducer";
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


export const Todolist = React.memo((props: TodolistPropsType) => {
        console.log('TODOLIST')

        let dispatch = useDispatch()
        let tasksForTodolist = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistId])

        const addTask = useCallback((title: string) => dispatch(AddTask(title, props.todolistId)), [props.todolistId, dispatch])
        const changeTodolistTitle = useCallback((newTitle: string) => dispatch(ChangeTodolistTitle(props.todolistId, newTitle)), [dispatch, props.todolistId])
        const removeTodolist = useCallback(() => dispatch(RemoveTodolist(props.todolistId)), [dispatch, props.todolistId])

        const onAllFilter = useCallback(() => dispatch(ChangeTodolistFilter(props.todolistId, "all")), [props.todolistId, dispatch])
        const onActiveFilter = useCallback(() => dispatch(ChangeTodolistFilter(props.todolistId, "active")), [props.todolistId, dispatch])
        const onCompletedFilter = useCallback(() => dispatch(ChangeTodolistFilter(props.todolistId, "completed")), [props.todolistId, dispatch])

        useEffect(()=>{
            dispatch(GetTasks(props.todolistId))
        },[])

        if (props.filter === "active") {

            tasksForTodolist = tasksForTodolist.filter((i) => i.status === TaskStatuses.New)

        }
        if (props.filter === "completed") {

            tasksForTodolist = tasksForTodolist.filter(i => i.status === TaskStatuses.Completed)
        }


        return (
            <div className={s.container}>

                <h3 className={s.span}>
                    <div>
                        <EditableSpan title={props.title} onChangeCallBack={changeTodolistTitle}/>
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
                        <Task task={t} todolistId={props.todolistId} key={t.id}/>
                    )}
                </div>
                <div className={s.status}>
                    <Button size={"small"} variant={props.filter === "all" ? "contained" : "text"}
                            onClick={onAllFilter}>All</Button>
                    <Button size={"small"} color={"primary"} variant={props.filter === "active" ? "contained" : "text"}
                            onClick={onActiveFilter}>Active
                    </Button>
                    <Button size={"small"} color={"warning"} variant={props.filter === "completed" ? "contained" : "text"}
                            onClick={onCompletedFilter}>Completed
                    </Button>
                </div>
            </div>

        )
    }
)

