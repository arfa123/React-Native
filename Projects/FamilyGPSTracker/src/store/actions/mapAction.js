export const userLocation = (location) => {
    return{
        type: 'USER_LOCATION',
        payload: location
    }
}
export const getCircles = (circles) => {
    circles.createdCircles.unshift("Select Circle")
    circles.memberCircles.unshift("Select Circle")
    return{
        type: 'GET_CIRCLES',
        payload: circles
    }
}
export const circleAdded = (circles) => {
    circles.unshift("Select Circle")
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
export const circleMembers = (members) => {
    return{
        type: 'CIRCLE_MEMBERS',
        payload: members
    }
}