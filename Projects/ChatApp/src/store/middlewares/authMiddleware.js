import {firebaseApp} from '../../firebaseApp';
import * as AuthAction from '../actions/authAction';

export class AuthService{
    static signupUser = (user) => {
        return (dispatch) => {
            firebaseApp.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((userRes) => {
                userRes.updateProfile({
                    displayName: user.name
                })
                .then(() => {
                    let User = {
                        name: userRes.displayName,
                        email: userRes.email,
                        uid: userRes.uid
                    }
                    AuthService.createUserWithUid(dispatch, User)
                })
                .catch((error) => {
                    console.log("Error:",error)
                })
            })
            .catch((error) => {
                dispatch(AuthAction.signupReject(error))
            })
        }
    }
    static createUserWithUid = (dispatch, User) => {
        firebaseApp.database().ref(`Users/${User.uid}`).set(User)
        .then(() => {
            dispatch(AuthAction.signupSuccess(User))
        })
    }
    static loginUser = (user) => {
        return (dispatch) => {
            console.log("here:",user)
            firebaseApp.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((userRes) => {
                AuthService.getUser(dispatch, userRes)
                // console.log("User:",userRes)
            })
            .catch((error) => {
                dispatch(AuthAction.loginReject(error))
            })
        }
    }
    static getUser = (dispatch, userRes) => {
        firebaseApp.database().ref(`Users/${userRes.uid}`).once('value')
        .then((snap) => {
            dispatch(AuthAction.loginSuccess(snap.val()))
        })
    }
}