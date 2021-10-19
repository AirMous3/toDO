import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './App.css';
import {Header} from './components/AppBar/AppBar';
import {AppRootStateType} from "./state/redux/store";
import {GetTodolistsThunk} from "./state/redux/todolists-Reducer";
import LinearBuffer from "./components/temp/Preloader";
import {RequestStatusType} from "./state/redux/app-Reducer";
import ErrorBar from "./components/ErrorBar/ErrorBar";
import {TodolistsList} from "./components/TodolistsList/TodolistsList";


function App() {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(GetTodolistsThunk())
    }, [dispatch])

    return (
        <div className="App">
            <Header/>
            <ErrorBar/>
            {status === 'loading' && <LinearBuffer/>}
            <TodolistsList status={status}/>
        </div>
    );
}

export default App;
