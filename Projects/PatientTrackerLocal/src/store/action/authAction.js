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
export const loading = {
    type: 'LOADING'
}