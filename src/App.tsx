import React, {useState} from 'react';
import './App.css';
import Todolist, {FilterType, TaskType} from "./components/Todolist";

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        { id:1 , title: "Redux" , isDone: false },
        { id:2 , title: "React" , isDone: false },
        { id:3 , title: "HTML" , isDone: true},
        { id:4 , title: "Js" , isDone: true},
        { id:5 , title: "CSS" , isDone: false},
    ])

    let [filter, setFilter] = useState<FilterType>("all")

    const deleteTask = (id: number) => {
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
