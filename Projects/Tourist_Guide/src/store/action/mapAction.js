export const userLocation = (location) => {
    return {
        type: 'USER_LOCATION',
        payload: location
    }
}
export const nearPlaces = (places) => {
    return {
        type: 'NEAR_PLACES',
        payload: places
    }
}
export const placeSelected = (place) => {
    return {
        type: 'PLACE_SELECTED',
        payload: place
    }
}
export const setDirections = (directions) => {
    return {
        type: 'SET_DIRECTIONS',
        payload: directions
    }
}