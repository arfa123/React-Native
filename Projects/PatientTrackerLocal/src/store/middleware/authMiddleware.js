import * as AuthAction from '../action/authAction';
import {AsyncStorage} from 'react-native';

export class AuthService{
    static signupUser = (user) => {
        return (dispatch) => {
            AsyncStorage.setItem('user',JSON.stringify(user))
            .then((user) => {
                AsyncStorage.setItem('patients',JSON.stringify([]))
                .then(() => {
                    AsyncStorage.setItem('id','0')
                    .then(() => {
                        AsyncStorage.setItem('userRegistered', JSON.stringify({userReg: true}))
                        .then(() => {
                            dispatch(AuthAction.signupSuccess(JSON.parse(user)))
                        })
                    })
                })
            })
            .catch((error) => {
                dispatch(AuthAction.signupReject(error))
            })
        }
    }
} 