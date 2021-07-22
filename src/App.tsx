import React from 'react';
import './App.css';
import Todolist from "./components/Todolist";

function App() {
    return (
        <div className="App">

            <Todolist title={"what to buy"}/>
            <Todolist title={"what to learn"}/>
        </div>
    );
}

export default App;
