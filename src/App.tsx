import React from 'react';
import './App.css';
import Todolist, {TaskType} from "./components/Todolist";

function App() {


    let tasks: Array<TaskType> = [
        { id:1 , title: "Redux" , isDone: false },
        { id:2 , title: "React" , isDone: false },
        { id:3 , title: "HTML" , isDone: true},
        { id:4 , title: "Js" , isDone: true},
        { id:5 , title: "CSS" , isDone: false},
    ]



    return (
        <div className="App">
            <Todolist title={"what to learn"} tasks={tasks} />
        </div>
    );
}

export default App;
