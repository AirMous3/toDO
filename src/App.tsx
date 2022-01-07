import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import './App.css';
import {Header} from './components/AppBar/AppBar';
import {AppRootStateType} from "./state/redux/store";
import LinearBuffer from "./components/temp/Preloader";
import {initializeApp, RequestStatusType} from "./state/redux/app-Reducer";
import ErrorBar from "./components/ErrorBar/ErrorBar";
import {TodolistsList} from "./components/TodolistsList/TodolistsList";
import {Redirect, Route, Switch} from "react-router-dom";
import {Login} from "./components/Login/Login";
import {LinearProgress} from "@mui/material";
import Container from "@mui/material/Container/Container";


function App() {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector((state: AppRootStateType) => state.app.isInitialized)


    useEffect(() => {
        dispatch(initializeApp()) /*Инициализация приложения*/
    }, [])

    if (!isInitialized) {
        return <LinearProgress/> /*Если приложение не инициализированно, показывать прелоадер*/
    }
    return (
        <div className="App">
            <Header/>
            <ErrorBar/>
            {status === 'loading' && <LinearBuffer/>}
            <Container maxWidth="xl">
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList status={status}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={'/404'} render={() => <h1>404 page not found (＃＞＜)</h1>}/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>
        </div>
    );
}

export default App;
