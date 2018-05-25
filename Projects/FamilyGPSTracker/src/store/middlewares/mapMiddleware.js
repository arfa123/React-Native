import * as MapAction from '../actions/mapAction';
import {firebaseApp} from '../../Firebase';

export class MapMiddleware{
    static userLocation = (location) => {
        return (dispatch) => {
            dispatch(MapAction.userLocation(location))
        }
    }
    static getCircles = (user, location) => {
        return (dispatch) => {
            let createdCircles = undefined;
            let circles = undefined;
            firebaseApp.database().ref(`Users/${user}/createdCircles`)
            .once('value', (snap) => {
                if(snap.val() !== null || undefined){
                    createdCircles = Object.values(snap.val())
                }
            })
            .then(() => {
                firebaseApp.database().ref(`Users/${user}/circles`)
                .once('value', (snap) => {
                    if(snap.val() !== null || undefined){
                        circles = Object.values(snap.val())
                    }
                })
                .then(() => {
                    let Circles = {
                        createdCircles: createdCircles,
                        memberCircles: circles
                    }
                    if(Circles.createdCircles !== null || undefined){
                        Circles.createdCircles.map((x,y) => {
                            console.log("here:",x,location)
                            firebaseApp.database().ref(`Circles/${x.circleID}/${user}/location`).set(location)
                        })
                    }
                    if(Circles.memberCircles !== null || undefined){
                        Circles.memberCircles.map((x,y) => {
                            console.log("here:",x,location)
                            firebaseApp.database().ref(`Circles/${x.circleID}/${user}/location`).set(location)
                        })
                    }
                    console.log("here:",Circles)
                    dispatch(MapAction.getCircles(Circles))
                })
            })
            
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
                    firebaseApp.database().ref(`Users/${user.uid}/createdCircles/${circle.circleID}`).set(circle)
                    .then(() => {
                        firebaseApp.database().ref(`Users/${user.uid}/createdCircles`)
                        .once('value', (snap) => {
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
                console.log("lol1:",snap.val())
                if(snap.val() !== null || undefined){
                    dispatch(MapAction.invitations(Object.values(snap.val())))
                }
                else{
                    console.log("lol2:",snap.val())
                    dispatch(MapAction.invitations([]))
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
                        firebaseApp.database().ref(`Users/${user.uid}/circles/${circle.circleID}`).set(circle)
                        .then(() => {
                            firebaseApp.database().ref(`Users/${user.uid}/invitations`).orderByChild('circleID').equalTo(circle.circleID)
                            .once('value', (snap) => {
                                firebaseApp.database().ref(`Users/${user.uid}/invitations`).child(Object.keys(snap.val())[0]).remove()
                            })
                            .then(() => {
                                firebaseApp.database().ref(`Users/${user.uid}/invitations`)
                                .once('value', (snap) => {
                                    if(snap.val() !== null || undefined){
                                        dispatch(MapAction.invitations(Object.values(snap.val())))
                                    }
                                    else{
                                        dispatch(MapAction.invitations([]))
                                    }
                                })
                            })
                        })
                    })
                })
            }
        }
    }
    static rejectRequest = (circle) => {
        return (dispatch) => {
            const user = firebaseApp.auth().currentUser
            if(user){
                firebaseApp.database().ref(`Users/${user.uid}/invitations`).orderByChild('circleID').equalTo(circle.circleID)
                .once('value', (snap) => {
                    firebaseApp.database().ref(`Users/${user.uid}/invitations`).child(Object.keys(snap.val())[0]).remove()
                })
                .then(() => {
                    firebaseApp.database().ref(`Users/${user.uid}/invitations`)
                    .once('value', (snap) => {
                        if(snap.val() !== null || undefined){
                            dispatch(MapAction.invitations(Object.values(snap.val())))
                        }
                        else{
                            dispatch(MapAction.invitations([]))
                        }
                    })
                })
            }
        }
    }
    static getCircleMembers = (circle) => {
        return (dispatch) => {
            console.log("getMembers:",circle)
            firebaseApp.database().ref(`Circles/${circle.circleID}`)
            .once('value', (snap) => {
                console.log("members:",snap.val())
                dispatch(MapAction.circleMembers(Object.values(snap.val())))
            })
        }
    }
}