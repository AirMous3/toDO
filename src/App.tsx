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
import {Redirect, Route, Switch} from "react-router-dom";
import {Login} from "./components/Login/Login";


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
            <Switch>
                <Route path={'/login'} exact render={() => <Login/>}/>
                <Route path={'/'} exact render={() => <TodolistsList status={status}/>}/>
                <Route path={'/404'} exact render={() => <h1>page not found</h1>}/>
                <Redirect from={'*'} to={'/404'}/>
            </Switch>
        </div>
    );
}

export default App;
