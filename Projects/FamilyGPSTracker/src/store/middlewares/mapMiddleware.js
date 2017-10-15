import * as MapAction from '../actions/mapAction';
import {firebaseApp} from '../../Firebase';

export class MapMiddleware{
    static userLocation = (location) => {
        return (dispatch) => {
            const user = firebaseApp.auth().currentUser
            if(user){
                dispatch(MapAction.userLocation(location))
            }
        }
    }
    static getCircles = () => {
        return (dispatch) => {
            const user = firebaseApp.auth().currentUser
            if(user){
                firebaseApp.database().ref(`Users/${user.uid}/createdCircles`)
                .once('value', (snap) => {
                    if(snap.val() !== null || undefined){
                        dispatch(MapAction.circleAdded(Object.values(snap.val())))
                    }
                })
            }
        }
    }
    static addCircle = (circleName,location) => {
        return (dispatch) => {
            const user = firebaseApp.auth().currentUser
            if(user){
                const circleID = firebaseApp.database().ref(`Circles`).push(`${user.uid}`).key
                firebaseApp.database().ref(`Circles/${circleID}/${user.uid}/user`).set({name: user.displayName, email: user.email, admin: true})
                .then(() => {
                    firebaseApp.database().ref(`Circles/${circleID}/${user.uid}/location`).set(location)
                })
                .then(() => {
                    let circle = {
                        circleID: circleID,
                        circleName: circleName
                    }
                    firebaseApp.database().ref(`Users/${user.uid}/createdCircles`).push(circle)
                    .then(() => {
                        firebaseApp.database().ref(`Users/${user.uid}/createdCircles`)
                        .once('value', (snap) => {
                            console.log("circles:",Object.values(snap.val()))
                            dispatch(MapAction.circleAdded(Object.values(snap.val())))
                        })
                    })
                })
            }
        }
    }
    static findUser = (userEmail) => {
        return (dispatch) => {
            firebaseApp.database().ref(`Users`).orderByChild('email').equalTo(userEmail)
            .once('value', (snap) => {
                if(snap.val() !== null){
                    dispatch(MapAction.userFind(Object.values(snap.val())[0]))
                }
            })
        }
    }
    static sendInvitation = (sender, reciever, circle) => {
        return (dispatch) => {
            let invitation = {
                name: sender.name,
                email: sender.email,
                circleName: circle.circleName,
                circleID: circle.circleID
            }
            firebaseApp.database().ref(`Users/${reciever.uid}/invitations`).push(invitation)
            .then(() => {
                alert("Invitation has been sended")
                dispatch({type: 'INVITATION_SENDED'})
            })
        }
    }
    static getInvitations = (user) => {
        return (dispatch) => {
            firebaseApp.database().ref(`Users/${user.uid}/invitations`)
            .once('value', (snap) => {
                if(snap.val() !== null || undefined){
                    dispatch(MapAction.invitations(Object.values(snap.val())))
                }
            })
        }
    }
    static acceptRequest = (location, circle) => {
        return (dispatch) => {
            const user = firebaseApp.auth().currentUser
            if(user){
                firebaseApp.database().ref(`Circles/${circle.circleID}/${user.uid}/user`).set({name: user.displayName, email: user.email, admin: false})
                .then(() => {
                    firebaseApp.database().ref(`Circles/${circle.circleID}/${user.uid}/location`).set(location)
                    .then(() => {
                        firebaseApp.database().ref(`Users/${user.uid}/circles`).push(circle)
                        .then(() => {
                            firebaseApp.database().ref(`Users/${user.uid}/invitations`).orderByChild('circleID').equalTo(circle.circleID)
                            .once('value', (snap) => {
                                console.log("here:",snap.val())
                            })
                        })
                    })
                })
            }
        }
    }
}