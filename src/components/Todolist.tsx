import React, {ChangeEvent, useState} from "react";

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

    let [title, setTitle] = useState("")
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <div><h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler}/>
                <button onClick={ () => props.addTask(title)}>+</button>
            </div>
            <ul>
                {props.tasks.map((t) =>
                    <li key={t.id}>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={ () => props.deleteTask(t.id)}>del</button>
                    </li> )}

            </ul>
            <div>
                <button onClick={ () => props.changeFilter("all")} >All</button>
                <button onClick={ () => props.changeFilter("active")} >Active</button>
                <button onClick={ () => props.changeFilter("completed")} >Completed</button>
            </div>
        </div>

    )
}

export default Todolist