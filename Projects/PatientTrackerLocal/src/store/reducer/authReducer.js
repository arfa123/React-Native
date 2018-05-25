const InitialState = {
    user: {},
    isRegistered: false,
}
export const AuthReducer = (state = InitialState, action) => {
    switch(action.type){
        case 'SIGNUP':
            return {...InitialState, user: action.payload, isRegistered: true}
        case 'SIGNUP_REJECT':
            return {...InitialState, isError: true, errorMessage: action.payload}
        default:
            return state
    }
}