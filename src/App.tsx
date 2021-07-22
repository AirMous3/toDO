import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./components/Todolist";

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        { id:1 , title: "Redux" , isDone: false },
        { id:2 , title: "React" , isDone: false },
        { id:3 , title: "HTML" , isDone: true},
        { id:4 , title: "Js" , isDone: true},
        { id:5 , title: "CSS" , isDone: false},
    ])

    const deleteTask = (id: number) => {
        tasks = tasks.filter(i => i.id != id )
        setTasks(tasks)
    }


    return (
        <div className="App">
            <Todolist title={"what to learn"} tasks={tasks} deleteTask={deleteTask} />
        </div>
    );
}

export default App;
