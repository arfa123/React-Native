const InitialState = {
    user: {},
    isRegistered: false,
    isLogin: false,
    isError: false,
    loader: false,
    errorMessage: {}
}
export const AuthReducer = (state = InitialState, action) => {
    switch(action.type){
        case 'REDIRECT':
            return {...InitialState, isLogin: true, user: action.payload}
        case 'LOADING':
            return {...InitialState, loader: true}
        case 'CLEAR_MSG':
            return {...state, errorMessage: {}}
        case 'LOGIN':
            return {...InitialState, user: action.payload, isLogin: true}
        case 'LOGIN_REJECT':
            return {...InitialState, isError: true, errorMessage: action.payload}
        case 'SIGNUP':
            return {...InitialState, user: action.payload, isRegistered: true, isLogin: true}
        case 'SIGNUP_REJECT':
            return {...InitialState, isError: true, errorMessage: action.payload}
        case 'LOGOUT':
            return {...InitialState}
        case 'LOGOUT_REJECT':
            return {...state, isError: true, errorMessage: action.payload}
        default:
            return state
    }
}