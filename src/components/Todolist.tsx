import React, {ChangeEvent, KeyboardEvent, useState} from "react";

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
}
export type FilterType = "all" | "completed" | "active"

function Todolist(props: TodolistPropsType) {

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title, props.todolistId)
            setTitle("")
        } else {
            setError("Wrong title!")
        }
    }


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }
    const removeTodolist = () => {
        props.deleteTodolist(props.todolistId)
    }
    const onAllFilter = () => props.changeFilter("all", props.todolistId)
    const onActiveFilter = () => props.changeFilter("active", props.todolistId)
    const onCompletedFilter = () => props.changeFilter("completed", props.todolistId)

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)


    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolist}>x</button>
            </h3>
            <div>
                <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}
                       className={error ? "error" : ""}/>
                <button onClick={addTask}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map((t) => {
                    const onDeleteHandler = () => props.deleteTask(t.id, props.todolistId)
                    const onIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId)
                    }
                    return <li key={t.id} className={t.isDone === true ? "isDone" : ""}>
                        <input type="checkbox" checked={t.isDone} onChange={onIsDoneHandler}/>
                        <span>{t.title}</span>
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