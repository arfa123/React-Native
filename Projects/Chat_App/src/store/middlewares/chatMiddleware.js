import {firebaseApp} from '../../firebaseApp';
import * as ChatActions from '../actions/chatActions';

export class ChatService {
    static getUsers = () => {
        return (dispatch) => {
            firebaseApp.database().ref(`/Users`).on('value', (snap) => {
                dispatch(ChatActions.usersList(Object.values(snap.val())))
            })
        }
    }
    static getMessages = (x,uid) => {
        return (dispatch) => {
            let messages = []
            firebaseApp.database().ref(`/Messages/${uid}/${x}`).on('value', (snap) => {
                console.log("messages:",snap.val())
                if(snap.val() !== null){
                    dispatch(ChatActions.messages(Object.values(snap.val())))
                }
                else{
                    dispatch(ChatActions.messages(messages))
                }
            })
        }
    }
    static sendMessage = (message,sender,reciever) => {
        return (dispatch) => {
            firebaseApp.database().ref(`/Messages/${reciever}/${sender}`).push(message)
            .then((res1) => {
                firebaseApp.database().ref(`/Messages/${sender}/${reciever}`).push(message)
                .then((res2) => {
                    console.log("message saved",res2)
                })
                .catch((error) => {
                    console.log("Error:",error)
                })
            })
            .catch((error) => {
                console.log("err",error)
            })
        }
    }
}