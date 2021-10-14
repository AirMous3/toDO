export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
    status: RequestStatusType
}
let initialState: InitialStateType = {
    status: 'loading'
}

type ActionType = ReturnType<typeof changeAppStatus>

export const appReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "CHANGE-STATUS":
            return {
                ...state, status: action.status
            }
        default:
            return state
    }


}

export const changeAppStatus = (status: RequestStatusType) => ({type: 'CHANGE-STATUS', status}) as const