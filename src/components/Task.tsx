import React, {ChangeEvent, useCallback} from "react";
import {ChangeTaskStatus, ChangeTaskTitle, DeleteTaskThunk, TaskType} from "../state/tasks-Reducer";
import s from "./Todolist.module.css";
import {Button, Checkbox} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {HighlightOffOutlined} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {TaskStatuses} from "../state/api/todolists-api";

type PropsTaskType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo(({task, todolistId}: PropsTaskType) => {
    console.log('TASK RENDER')
    let dispatch = useDispatch()
    const onDeleteHandler = () => dispatch(DeleteTaskThunk(task.id , todolistId)) // удаление таски
    const onIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(ChangeTaskStatus(task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, todolistId))   /*смена статуса таски ,  если чекд true - тогда Completed иначе New*/
    }
    const onChangeTaskTitle = useCallback((newTitle: string) => {
        dispatch(ChangeTaskTitle(task.id, newTitle, todolistId)) // смена имени таски
    }, [dispatch, task.id, todolistId])


    return <div className={`${s.tasks} ${task.status === TaskStatuses.Completed ? s.isDone : ''}`} key={task.id}>  {/*Если ТаскСтатус = Комплетед - тогда навешивается стиль, иначе пустая строка*/}


        <div>
            <Checkbox size={'small'} checked={task.status === TaskStatuses.Completed} onChange={onIsDoneHandler}/> {/*Если ТаскСтатус = Комплетед, тогда значение Checked будет true */}

            <EditableSpan title={task.title} onChangeCallBack={onChangeTaskTitle}/>
        </div>
        <div>
            <Button size={"small"} onClick={onDeleteHandler}>
                <HighlightOffOutlined/>
            </Button>
        </div>
    </div>
})