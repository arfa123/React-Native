const InitialState = {
    user: {},
    isError: false,
    isLogin: false,
    loader: false,
    errorMessage: {}
}

export const AuthReducer = (state = InitialState, action) => {
    switch(action.type){
        case 'LOADING':
            return {...InitialState, loader: true}
        case 'CLR_MSG':
            return {...state, errorMessage: {}}
        case 'LOGIN':
            return {...InitialState, isLogin: true, user: action.payload}
        case 'LOGIN_REJECT':
        return {...InitialState, isError: true, errorMessage: action.payload}
        case 'SIGNUP':
            return {...InitialState, user: action.payload, isRegistered: true, isLogin: true}
        case 'SIGNUP_REJECT':
            return {...InitialState, isError: true, errorMessage: action.payload}
        case 'LOGOUT':
            return {...InitialState, isLogin: false, user: {}}
        case 'LOGOUT_REJECT':
            return {...state, isError: true, errorMessage: action.payload}
        default:
            return state
    }
}