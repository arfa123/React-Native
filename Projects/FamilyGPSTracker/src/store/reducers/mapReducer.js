const InitialState = {
    userLocation: {
        latitude: 90,
        longitude: 90
    },
    createdCircles: undefined,
    memberCircles: undefined,
    circleAdded: false,
    findedUser: undefined,
    selectedCircle: undefined,
    invitations: [],
    circleMembers: []
}

export const MapReducer = (state = InitialState, action) => {
    switch(action.type){
        case 'USER_LOCATION':
            return{...state, userLocation: action.payload}
        case 'GET_CIRCLES':
            return{...state, createdCircles: action.payload.createdCircles, memberCircles: action.payload.memberCircles}
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
        case 'CIRCLE_MEMBERS':
            return{...state, circleMembers: action.payload}
        default:
            return state
    }
}