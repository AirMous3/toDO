import React, {useState} from 'react';
import './App.css';
import Todolist, {FilterType, TaskType} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";


type TodolistsType = {
    id: string
    title: string
    filter: string
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {


    const addTask = (title: string, todolistId: string) => {
        let newTask: TaskType = {id: v1(), title, isDone: false}
        let newTasks = [...tasks[todolistId], newTask]
        tasks[todolistId] = newTasks
        setTasks({...tasks})
    }

    const deleteTask = (id: string, todolistId: string) => {
        let filteredTasks = tasks[todolistId].filter(i => i.id != id)
        tasks[todolistId] = filteredTasks
        setTasks({...tasks})
    }


    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let findedTask = tasks[todolistId].find(t => t.id === taskId)
        if (findedTask) {
            findedTask.isDone = isDone
            setTasks({...tasks})
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
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: "What to Learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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

    let newTodolistId = v1()

    const addNewTodolist = (title: string) => {
        let newTodolist: TodolistsType = {id: newTodolistId, title, filter: "all"}
        setTodolists([...todolists, newTodolist])
        //let newTodolistToState: TasksStateType = {[newTodolist.id]:[]}   setTasks({...tasks,...newTodolistToState})
        setTasks({...tasks, [newTodolist.id]: []})

    }
    const changeTaskTitle = (taskId: string, todolistId: string, newTitle: string) => {
        let findedTask = tasks[todolistId].find(t => t.id === taskId)
        if (findedTask) {
            findedTask.title = newTitle
            setTasks({...tasks})
        }
    }
    const changeTodolistTile = (todolistId: string, newTitle: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if(todolist){
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    return (
        <div className="App">

            <AddItemForm addItemCallBack={addNewTodolist}/>

            {
                todolists.map((tl) => {

                    let tasksForTodolist = tasks[tl.id]

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
                                     changeTaskTitle={changeTaskTitle}
                                     changeTodolistTile={changeTodolistTile}
                    />
                })
            }

            {/*<Todolist title={"what to learn"} tasks={tasksForTodolist} deleteTask={deleteTask}*/}
            {/*          changeFilter={changeFilter} addTask={addTask} changeTaskStatus={changeStatus}*/}
            {/*          filter={filter}*/}
            {/*/>*/}
        </div>
    );
}

export default App;
