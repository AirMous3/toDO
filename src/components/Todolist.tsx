import React, {ChangeEvent, KeyboardEvent, useState} from "react";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    deleteTask: (id: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (title: string) => void
}
export type FilterType = "all" | "completed" | "active"

function Todolist(props: TodolistPropsType) {

    const addTask = () => {
        props.addTask(title)
        setTitle("")
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTask()
        }
    }
    const onAllFilter = () => props.changeFilter("all")
    const onActiveFilter = () => props.changeFilter("active")
    const onCompletedFilter = () => props.changeFilter("completed")

    let [title, setTitle] = useState("")


    return (
        <div><h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map((t) => {
                    const onDeleteHandler = () => props.deleteTask(t.id)
                    return <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onDeleteHandler}>del</button>
                    </li>
                })}

            </ul>
            <div>
                <button onClick={onAllFilter}>All</button>
                <button onClick={onActiveFilter}>Active</button>
                <button onClick={onCompletedFilter}>Completed</button>
            </div>
        </div>

    )
}

export default Todolist