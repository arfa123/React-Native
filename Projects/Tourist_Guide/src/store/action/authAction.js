export const loginSuccess = (user) => {
    return {
        type: 'LOGIN',
        payload: user
    }
}
export const loginReject = (error) => {
    return {
        type: 'LOGIN_REJECT',
        payload: error
    }
}
export const signupSuccess = (user) => {
    return {
        type: 'SIGNUP',
        payload: user
    }
}
export const signupReject = (error) => {
    return {
        type: 'SIGNUP_REJECT',
        payload: error
    }
}
export const logoutSuccess = {
    type: 'LOGOUT'
}
export const logoutReject = (error) => {
    return {
        type: 'LOGOUT_REJECT',
        payload: error
    }
}
export const loading = {
    type: 'LOADING'
}