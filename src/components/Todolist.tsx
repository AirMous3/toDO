
import { DeleteOutlined, HighlightOffOutlined } from "@mui/icons-material";
import { Button, Checkbox } from "@mui/material";
import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../state/redux/store";
import { AddTask, ChangeTaskStatus, ChangeTaskTitle, RemoveTask, TaskType } from "../state/tasks-Reducer";
import { ChangeTodolistFilter, ChangeTodolistTitle, RemoveTodolist } from "../state/todolists-Reducer";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import s from './Todolist.module.css';


type TodolistPropsType = {
    todolistId: string
    title: string
    filter: string

}
export type FilterType = "all" | "completed" | "active"

function Todolist(props: TodolistPropsType) {

    let dispatch = useDispatch()
    let tasksForTodolist = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistId])

    const addTask = (title: string) => dispatch(AddTask(title, props.todolistId))
    const changeTodolistTitle = (newTitle: string) => dispatch(ChangeTodolistTitle(props.todolistId, newTitle))
    const removeTodolist = () => dispatch(RemoveTodolist(props.todolistId))

    const onAllFilter = () => dispatch(ChangeTodolistFilter(props.todolistId, "all"))
    const onActiveFilter = () => dispatch(ChangeTodolistFilter(props.todolistId, "active"))
    const onCompletedFilter = () => dispatch(ChangeTodolistFilter(props.todolistId, "completed"))


    if (props.filter === "active") {

        tasksForTodolist = tasksForTodolist.filter((i) => !i.isDone)

    }
    if (props.filter === "completed") {

        tasksForTodolist = tasksForTodolist.filter(i => i.isDone)
    }



    return (
        <div className={s.container}>

            <h3 className={s.span} >
                <div >
                    <EditableSpan title={props.title} onChangeCallBack={changeTodolistTitle} />
                </div>
                <div className={s.deleteTodolistIcon}>
                    <Button size={"small"} onClick={removeTodolist}>
                        <DeleteOutlined />
                    </Button>
                </div>
            </h3>
            <AddItemForm addItemCallBack={addTask} />
            <div >
                {tasksForTodolist.map((t) => {
                    const onDeleteHandler = () => dispatch(RemoveTask(t.id, props.todolistId)) // удаление таски
                    const onIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(ChangeTaskStatus(t.id, e.currentTarget.checked, props.todolistId))  // смена статуса таски
                    }
                    const onChangeTaskTitle = (newTitle: string) => {
                        dispatch(ChangeTaskTitle(t.id, newTitle, props.todolistId)) // смена имени таски 
                    }
                    return <div className={`${s.tasks} ${t.isDone ? s.isDone : ''}`} key={t.id} >

                        <div >
                            <Checkbox size={'small'} checked={t.isDone} onChange={onIsDoneHandler} />

                            <EditableSpan title={t.title} onChangeCallBack={onChangeTaskTitle} />
                        </div>
                        <div >
                            <Button size={"small"} onClick={onDeleteHandler}>
                                <HighlightOffOutlined />
                            </Button>
                        </div>
                    </div>
                })}

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

export default Todolist