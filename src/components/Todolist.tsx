import React, {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox} from "@material-ui/core";
import {
    DeleteOutlined,
    HighlightOffOutlined
} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    deleteTodolist: (todolistId: string) => void
    todolistId: string
    title: string
    tasks: Array<TaskType>
    deleteTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    filter: string
    changeTaskTitle: (taskId: string, todolistId: string, newTitle: string) => void
    changeTodolistTile: (todolistId: string, newTitle: string) => void
}
export type FilterType = "all" | "completed" | "active"

function Todolist(props: TodolistPropsType) {


    const removeTodolist = () => {
        props.deleteTodolist(props.todolistId)
    }
    const onAllFilter = () => props.changeFilter("all", props.todolistId)
    const onActiveFilter = () => props.changeFilter("active", props.todolistId)
    const onCompletedFilter = () => props.changeFilter("completed", props.todolistId)
    const addTask = (title: string) => {props.addTask(title,props.todolistId)}
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTile(props.todolistId, newTitle)
    }

    return (
        <div>
            <h3> <EditableSpan title={props.title} onChangeCallBack={changeTodolistTitle}/>
                <Button size={"small"} onClick={removeTodolist}>
                    <DeleteOutlined/>
                </Button>
            </h3>
            <AddItemForm addItemCallBack={addTask} />
            <div>
                {props.tasks.map((t) => {
                    const onDeleteHandler = () => props.deleteTask(t.id, props.todolistId)
                    const onIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId)}
                    const onChangeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(t.id, props.todolistId, newTitle)
                    }
                    return <div key={t.id} className={t.isDone === true ? "isDone" : ""}>
                        <Checkbox checked={t.isDone} onChange={onIsDoneHandler}/>

                        <EditableSpan title={t.title} onChangeCallBack={onChangeTaskTitle} />

                        <Button size={"small"} onClick={onDeleteHandler}>
                            <HighlightOffOutlined />
                        </Button>
                    </div>
                })}

            </div>
            <div>
                <Button size={"small"} variant={props.filter === "all" ? "contained" : "text"}  onClick={onAllFilter}>All</Button>
                <Button size={"small"} color={"primary"} variant={props.filter === "active" ? "contained" : "text"}  onClick={onActiveFilter}>Active
                </Button>
                <Button size={"small"} color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"} onClick={onCompletedFilter}>Completed
                </Button>
            </div>
        </div>

    )
}

export default Todolist