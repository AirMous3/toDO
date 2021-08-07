import React, {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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


    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItemcallBack={addTask} />
            <ul>
                {props.tasks.map((t) => {
                    const onDeleteHandler = () => props.deleteTask(t.id, props.todolistId)
                    const onIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId)}
                    const onChangeTitleEditableSpan = (newTitle: string) => {
                        props.changeTaskTitle(t.id, props.todolistId, newTitle)
                    }
                    return <li key={t.id} className={t.isDone === true ? "isDone" : ""}>
                        <input type="checkbox" checked={t.isDone} onChange={onIsDoneHandler}/>

                        <EditableSpan title={t.title} onChange={onChangeTitleEditableSpan} />

                        <button onClick={onDeleteHandler}>x</button>
                    </li>
                })}

            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllFilter}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveFilter}>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={onCompletedFilter}>Completed
                </button>
            </div>
        </div>

    )
}

export default Todolist