export const userLocation = (location) => {
    return{
        type: 'USER_LOCATION',
        payload: location
    }
}
export const circleAdded = (circles) => {
    return{
        type: 'CIRCLE_ADDED',
        payload: circles
    }
}
export const userFind = (user) => {
    return{
        type: 'USER_FINDED',
        payload: user
    }
}
export const invitations = (invitations) => {
    return{
        type: 'INVITATIONS',
        payload: invitations
    }
}