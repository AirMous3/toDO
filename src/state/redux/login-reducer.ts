import {Dispatch} from "redux";
import {setAppStatus, setAppError} from "./app-Reducer";
import {authAPI, LoginPayloadType} from "../api/todolists-api";

type InitialStateType = {
    isLogged: boolean
}
type ActionsType = ReturnType<typeof setIsLoggedIn>

let initialState: InitialStateType = {
    isLogged: false
}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "IS-LOGGED-IN":
            return {...state, isLogged: action.value}
        default:
            return state
    }
}

////////// AC
export const setIsLoggedIn = (value: boolean) => ({type: 'IS-LOGGED-IN', value}) as const


///////// THUNK
export const loginThunk = (payload: LoginPayloadType) => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    authAPI.login(payload).then((res) => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn(true))
            dispatch(setAppStatus('succeeded'))
        } else {
            dispatch(setAppError(res.data.messages[0]))
            dispatch(setAppStatus('failed'))
        }
    })
}

export const logOutThunk = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus('loading'))
    authAPI.logOut().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn(false))
            dispatch(setAppStatus('succeeded'))
        } else {
            dispatch(setAppError(res.data.messages[0]))
            dispatch(setAppStatus('failed'))
        }
    })
}
