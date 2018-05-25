import * as AuthAction from '../action/authAction';
import axios from 'axios';
import {SIGNIN_URL, SIGNUP_URL} from '../../api';

export class AuthService{
    static signupUser = (user) => {
        return (dispatch) => {
            axios.post(SIGNUP_URL, (user))
            .then((userResponse) => {
                console.log("res",userResponse)
                dispatch(AuthAction.signupSuccess(userResponse.data))
            })
            .catch((error) => {
                console.log("err",error)
                dispatch(AuthAction.signupReject(error))
            })
        }
    }
    static loginUser = (user) => {
        return (dispatch) => {
            axios.post(SIGNIN_URL, (user))
            .then((userResponse) => {
                console.log("res",userResponse.data)
                dispatch(AuthAction.loginSuccess(userResponse.data))
            })
            .catch((error) => {
                console.log("err",error)
                dispatch(AuthAction.loginReject(error))
            })
        }
    }
} 