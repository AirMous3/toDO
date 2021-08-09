import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@material-ui/core";
import {LibraryAddOutlined} from "@material-ui/icons";

type PropsType = {
    addItemCallBack: (title: string) => void

}

export const AddItemForm = (props: PropsType) => {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
    }
    const addTask = () => {
        if (title.trim() !== "") {
            props.addItemCallBack(title.trim())
            setTitle("")
        } else {
            setError("Text incorrect")
        }
    }

    return (<div>
        <TextField helperText={error} value={title}  label={"Type"} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}
               error={!!error}/>
        <Button size={"large"} variant={"text"} onClick={addTask}>
            <LibraryAddOutlined/>
        </Button>
    </div>)
}