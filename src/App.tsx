import React, {useState} from 'react';
import './App.css';
import Todolist, {FilterType, TaskType} from "./components/Todolist";
import {v1} from "uuid";

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "Js", isDone: true},
        {id: v1(), title: "CSS", isDone: false},
    ])

    const addTask = (title: string) => {
        let newTask: TaskType = {id: v1(), title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const deleteTask = (id: string) => {
        tasks = tasks.filter(i => i.id != id)
        setTasks(tasks)
    }

    const changeStatus = (id: string, isDone: boolean) => {
        let task = tasks.find( t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }


    let [filter, setFilter] = useState<FilterType>("all")


    let tasksForTodolist = tasks

    if (filter === "active") {
        tasksForTodolist = tasks.filter(i => !i.isDone)

    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(i => i.isDone)

    }
    const changeFilter = (value: FilterType) => {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist title={"what to learn"} tasks={tasksForTodolist} deleteTask={deleteTask}
                      changeFilter={changeFilter} addTask={addTask} changeTaskStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
