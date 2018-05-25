const InitialState = {
    userLocation: {
        latitude: 0,
        longitude: 0
    },
    nearPlaces: [],
    selectedPlace: undefined,
    directions: undefined,
    legs: {
        distance: 0,
        duration: 0
    }
}

export const MapReducer = (state = InitialState, action) => {
    switch(action.type){
        case 'USER_LOCATION':
            return {...state, userLocation: action.payload}
        case 'NEAR_PLACES':
            return {...state, nearPlaces: action.payload}
        case 'PLACE_SELECTED':
            return {...state, selectedPlace: action.payload, directions: undefined}
        case 'SET_DIRECTIONS':
            return {...state, directions: action.payload.coords, legs: {distance: action.payload.distance, duration: action.payload.duration}}
        case 'UNSELECT_PLACE':
            return {...state, selectedPlace: undefined, directions: undefined, legs: {distance: 0, duration: 0}}
        case 'CLEAR_DIRECTIONS':
            return {...state, directions: undefined, legs: {distance: 0, duration: 0}}
        default:
            return state
    }
}