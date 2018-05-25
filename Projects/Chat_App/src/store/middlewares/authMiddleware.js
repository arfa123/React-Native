import {firebaseApp} from '../../firebaseApp';
import * as AuthAction from '../actions/authAction';
import {AsyncStorage} from 'react-native';

export class AuthService{
    static signupUser = (user) => {
        return (dispatch) => {
            firebaseApp.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((userRes) => {
                AsyncStorage.setItem('user', JSON.stringify(user)).then((res) => console.log("async signup:",res))
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
            firebaseApp.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((userRes) => {
                console.log("user:",user)
                AsyncStorage.setItem('user', JSON.stringify(user)).then((res) => console.log("async login",res))
                let User = {
                    name: userRes.displayName,
                    email: userRes.email,
                    uid: userRes.uid
                }
                dispatch(AuthAction.loginSuccess(User))
            })
            .catch((error) => {
                dispatch(AuthAction.loginReject(error))
            })
        }
    }
}