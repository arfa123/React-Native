import * as AuthAction from '../actions/authAction';
import {firebaseApp} from '../../Firebase';

export class AuthService{
    static signupUser = (user) => {
        return (dispatch) => {
            firebaseApp.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((userResponse) => {
                userResponse.updateProfile({
                    displayName: user.name
                })
                .then(() => {
                    let User = {
                        name: userResponse.displayName,
                        email: userResponse.email,
                        uid: userResponse.uid
                    }
                    firebaseApp.database().ref('Users/' + userResponse.uid).set(User)
                    .then(() => {
                        dispatch(AuthAction.signupSuccess(User))
                    })
                })
            })
            .catch((error) => {
                dispatch(AuthAction.signupReject(error))
            })
        }
    }
    static loginUser = (user) => {
        return (dispatch) => {
            firebaseApp.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((userResponse) => {
                let User = {
                    name: userResponse.displayName,
                    email: userResponse.email,
                    uid: userResponse.uid
                }
                console.log("user:",User)
                dispatch(AuthAction.loginSuccess(User))
            })
            .catch((error) => {
                dispatch(AuthAction.loginReject(error))
            })
        }
    }
    static getUser = (dispatch, userResponse) => {
        firebaseApp.database().ref('Users/' + userResponse.uid)
        .once('value').then((snap) => {
            dispatch(AuthAction.loginSuccess(snap.val()))
        })
    }
}