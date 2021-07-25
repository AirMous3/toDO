import React, {useState} from 'react';
import './App.css';
import Todolist, {FilterType, TaskType} from "./components/Todolist";
import {v1} from "uuid";

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        { id:v1() , title: "Redux" , isDone: false },
        { id:v1() , title: "React" , isDone: false },
        { id:v1() , title: "HTML" , isDone: true},
        { id:v1() , title: "Js" , isDone: true},
        { id:v1() , title: "CSS" , isDone: false},
    ])

    let [filter, setFilter] = useState<FilterType>("all")

    const deleteTask = (id: string) => {
        tasks = tasks.filter(i => i.id != id )
        setTasks(tasks)
    }

    let tasksForTodolist = tasks

    if (filter === "active") {
        tasksForTodolist = tasks.filter(i => !i.isDone )

    }
    if (filter ===  "completed"){
        tasksForTodolist = tasks.filter( i => i.isDone)

    }
    const changeFilter = (value: FilterType ) => {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist title={"what to learn"} tasks={tasksForTodolist} deleteTask={deleteTask} changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
