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

    let tasks2: Array<TaskType> = [
        { id:1 , title: "Bread" , isDone: true },
        { id:2 , title: "Milk" , isDone: false },
        { id:3 , title: "Water" , isDone: false},
        { id:4 , title: "Chicken" , isDone: true},
        { id:5 , title: "Chips" , isDone: true},
    ]

    return (
        <div className="App">
            <Todolist title={"what to buy"} tasks={tasks} />
            <Todolist title={"what to learn"} tasks={tasks2} />
        </div>
    );
}

export default App;
