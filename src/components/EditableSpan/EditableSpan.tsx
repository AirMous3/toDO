import TextField from "@mui/material/TextField/TextField";
import React, { ChangeEvent, useState } from "react";



type EditableSpanPropsType = {
    title: string
    onChangeCallBack: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('SPAN RENDER')
    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const changeEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const onBlurEffect = () => {
        setEditMode(false)
        props.onChangeCallBack(title)
    }

    return (editMode ?
        <TextField onBlur={onBlurEffect} autoFocus onDoubleClick={changeEditMode} onChange={onChangeTitleHandler} value={title} />
        : <span onDoubleClick={changeEditMode}>{props.title}</span>
    )
})