import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedIn} from "./loggin-Reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
let initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

type ActionType =
    ReturnType<typeof changeAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setInitialize>

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "CHANGE-STATUS":
            return {
                ...state, status: action.status
            }
        case "SET-APP-ERROR":
            return {
                ...state, error: action.error
            }
        case "SET-INITIALIZE":
            return {
                ...state, isInitialized: action.value
            }
        default:
            return state
    }


}

////////// AC
export const changeAppStatus = (status: RequestStatusType) => ({type: 'CHANGE-STATUS', status}) as const
export const setAppError = (error: string | null) => ({type: 'SET-APP-ERROR', error}) as const
export const setInitialize = (value: boolean) => ({type: 'SET-INITIALIZE', value}) as const


///////// THUNK

export const intializeAppThunk = () => (dispatch: Dispatch) => {
    authAPI.authMe().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setInitialize(true))
            dispatch(setIsLoggedIn(true))

        } else {
        }
    }).finally(() => {
        dispatch(setInitialize(true))
    })
}