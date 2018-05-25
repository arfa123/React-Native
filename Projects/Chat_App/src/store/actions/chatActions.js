export const usersList = (users) => {
    return{
        type: 'USERS_LIST',
        payload: users
    }
}
export const userSelected = (user) => {
    return{
        type: 'USER_SELECT',
        payload: user
    }
}
export const messages = (msg) => {
    return{
        type: 'MESSAGES',
        payload: msg
    }
}