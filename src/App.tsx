import React, {useState} from 'react';
import './App.css';
import Todolist, {FilterType, TaskType} from "./components/Todolist";
import {v1} from "uuid";


type TodolistsType = {
    id: string
    title: string
    filter: string
}

function App() {


    const addTask = (title: string, todolistId: string) => {
        let newTask: TaskType = {id: v1(), title, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [...tasks, newTask]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }

    const deleteTask = (id: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(i => i.id != id)
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }

    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    const changeFilter = (value: FilterType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    const deleteTodolist = (todolistId: string) => {
        let filteredTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolists)
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: "What to Learn", filter: "active"},
        {id: todolistId2, title: "What to buy", filter: "completed"},
    ])

    let [tasksObj, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "Js", isDone: true},
            {id: v1(), title: "CSS", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "Book", isDone: false},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Wine", isDone: false},
        ]
    })


    return (
        <div className="App">
            {
                todolists.map((tl) => {

                    let tasksForTodolist = tasksObj[tl.id]

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(i => !i.isDone)

                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(i => i.isDone)

                    }
                    return <Todolist key={tl.id} todolistId={tl.id} title={tl.title} tasks={tasksForTodolist}
                                     deleteTask={deleteTask}
                                     changeFilter={changeFilter} addTask={addTask} changeTaskStatus={changeStatus}
                                     filter={tl.filter} deleteTodolist={deleteTodolist}
                    />
                })
            }

            {/*<Todolist title={"what to learn"} tasksObj={tasksForTodolist} deleteTask={deleteTask}*/}
            {/*          changeFilter={changeFilter} addTask={addTask} changeTaskStatus={changeStatus}*/}
            {/*          filter={filter}*/}
            {/*/>*/}
        </div>
    );
}

export default App;
