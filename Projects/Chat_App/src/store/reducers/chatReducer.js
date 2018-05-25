const InitialState = {
    usersList: [],
    selectedUser: null,
    messages: []
}
export const ChatReducer = (state = InitialState, action) => {
    switch(action.type){
        case 'USERS_LIST':
            return {...state, usersList: action.payload}
        case 'USER_SELECT':
            return {...state, selectedUser: action.payload}
        case 'MESSAGES':
            return {...state, messages: action.payload}
        case 'LOGOUT':
            return {...InitialState}
        default:
            return state
    }
}