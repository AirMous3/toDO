export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
    status: RequestStatusType
    error: string | null
}
let initialState: InitialStateType = {
    status: 'loading',
    error: null
}

type ActionType =
    ReturnType<typeof changeAppStatus>
    | ReturnType<typeof setAppError>

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "CHANGE-STATUS":
            return {
                ...state, status: action.status
            }
        case "SET-APP-ERROR":
            return  {
                ...state, error: action.error
            }
        default:
            return state
    }


}

export const changeAppStatus = (status: RequestStatusType) => ({type: 'CHANGE-STATUS', status}) as const
export const setAppError = (error: string | null) => ({type: 'SET-APP-ERROR' , error}) as const