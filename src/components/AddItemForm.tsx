import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "@material-ui/core";

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
            setError("Wrong title!")
        }
    }

    return (<div>
        <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}
               className={error ? "error" : ""}/>
        <Button size={"small"} variant={"text"} onClick={addTask}>+</Button>
        {error && <div className={"error-message"}>{error}</div>}
    </div>)
}