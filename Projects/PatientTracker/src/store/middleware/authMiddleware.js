import * as AuthAction from '../action/authAction';
import {firebaseApp} from '../../Firebase';

export class AuthService{
    static signupUser = (user) => {
        return (dispatch) => {
            firebaseApp.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((userResponse) => {
                AuthService.createUserWithUid(dispatch, user, userResponse)
            })
            .catch((error) => {
                dispatch(AuthAction.signupReject(error))
            })
        }
    }
    static createUserWithUid = (dispatch, user, userResponse) => {
        delete user.password;
        firebaseApp.database().ref('Users/' + userResponse.uid).set(user)
        .then(() => {
            dispatch(AuthAction.signupSuccess(user))
        })
    }
    static loginUser = (user) => {
        return (dispatch) => {
            firebaseApp.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((userResponse) => {
                AuthService.getUser(dispatch, userResponse)
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