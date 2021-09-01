import React, {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox} from "@material-ui/core";
import {DeleteOutlined, HighlightOffOutlined} from "@material-ui/icons";
import {AddTask, ChangeTaskStatus, ChangeTaskTitle, RemoveTask, TaskType} from "../state/tasks-Reducer";
import {useDispatch, useSelector} from "react-redux";
import {ChangeTodolistFilter, ChangeTodolistTitle, RemoveTodolist} from "../state/todolists-Reducer";
import {AppRootStateType} from "../state/redux/store";


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
        <div>
            <h3><EditableSpan title={props.title} onChangeCallBack={changeTodolistTitle}/>
                <Button size={"small"} onClick={removeTodolist}>
                    <DeleteOutlined/>
                </Button>
            </h3>
            <AddItemForm addItemCallBack={addTask}/>
            <div style={{padding: "20px"}}>
                {tasksForTodolist.map((t) => {
                    const onDeleteHandler = () => dispatch(RemoveTask(t.id, props.todolistId))
                    const onIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(ChangeTaskStatus(t.id, e.currentTarget.checked, props.todolistId))
                    }
                    const onChangeTaskTitle = (newTitle: string) => {
                        dispatch(ChangeTaskTitle(t.id, newTitle, props.todolistId))
                    }
                    return <div key={t.id} className={t.isDone === true ? "isDone" : ""}>
                        <Checkbox checked={t.isDone} onChange={onIsDoneHandler}/>

                        <EditableSpan title={t.title} onChangeCallBack={onChangeTaskTitle}/>

                        <Button size={"small"} onClick={onDeleteHandler}>
                            <HighlightOffOutlined/>
                        </Button>
                    </div>
                })}

            </div>
            <div>
                <Button size={"small"} variant={props.filter === "all" ? "contained" : "text"}
                        onClick={onAllFilter}>All</Button>
                <Button size={"small"} color={"primary"} variant={props.filter === "active" ? "contained" : "text"}
                        onClick={onActiveFilter}>Active
                </Button>
                <Button size={"small"} color={"secondary"} variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={onCompletedFilter}>Completed
                </Button>
            </div>
        </div>

    )
}

export default Todolist