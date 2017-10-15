const InitialState = {
    userLocation: {
        latitude: 90,
        longitude: 90
    },
    createdCircles: [],
    circles: [],
    circleAdded: false,
    findedUser: undefined,
    selectedCircle: undefined,
    invitations: []
}

export const MapReducer = (state = InitialState, action) => {
    switch(action.type){
        case 'USER_LOCATION':
            return{...state, userLocation: action.payload}
        case 'CIRCLE_ADDED':
            return{...state, circleAdded: true, createdCircles: action.payload}
        case 'NEW_CIRCLE':
            return{...state, circleAdded: false}
        case 'USER_FINDED':
            return{...state, findedUser: action.payload}
        case 'INVITE':
            return{...state, selectedCircle: action.payload}
        case 'INVITATIONS':
            return{...state, invitations: action.payload}
        default:
            return state
    }
}