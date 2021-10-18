import React, {ChangeEvent, useCallback} from "react";
import {DeleteTaskThunk, TaskType, UpdateTaskThunk} from "../../state/tasks-Reducer";
import s from "../Todolist/Todolist.module.css";
import {Button, Checkbox} from "@mui/material";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {HighlightOffOutlined} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {TaskStatuses} from "../../state/api/todolists-api";
import {AppRootStateType} from "../../state/redux/store";
import {RequestStatusType} from "../../state/app-Reducer";

type PropsTaskType = {
    task: TaskType
    todolistId: string
}
export const Task = React.memo(({task, todolistId}: PropsTaskType) => {

    let dispatch = useDispatch()
    let entityStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const onDeleteHandler = () => dispatch(DeleteTaskThunk(task.id , todolistId)) // удаление таски
    const onIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(UpdateTaskThunk(task.todoListId, task.id, {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New }))  /*смена статуса таски ,  если чекд true - тогда Completed иначе New*/

    }
    const onChangeTaskTitle = useCallback((newTitle: string) => {
        dispatch(UpdateTaskThunk(todolistId,task.id, {title: newTitle})) // смена имени таски
    }, [dispatch, task.id, todolistId])


    return <div className={`${s.tasks} ${task.status === TaskStatuses.Completed ? s.isDone : ''}`} key={task.id}>  {/*Если ТаскСтатус = Комплетед - тогда навешивается стиль, иначе пустая строка*/}


        <div>
            <Checkbox disabled={entityStatus === 'loading'} size={'small'} checked={task.status === TaskStatuses.Completed} onChange={onIsDoneHandler}/> {/*Если ТаскСтатус = Комплетед, тогда значение Checked будет true */}

            <EditableSpan title={task.title} onChangeCallBack={onChangeTaskTitle}/>
        </div>
        <div>
            <Button size={"small"} onClick={onDeleteHandler}>
                <HighlightOffOutlined/>
            </Button>
        </div>
    </div>
})