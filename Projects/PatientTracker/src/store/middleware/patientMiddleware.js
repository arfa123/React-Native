import * as PatientAction from '../action/patientAction';
import {firebaseApp} from '../../Firebase';

export class PatientMiddleware{
    static addNewPatient = (patient) => {
        return (dispatch) => {
            let id = 0
            const user = firebaseApp.auth().currentUser
            if(user){
                firebaseApp.database().ref('/').child('Users/'+user.uid+'/id')
                .once('value', (snap) => {
                    id = snap.val()
                }).then(() => {
                    let patientWithID = {...patient, id: id}
                    firebaseApp.database().ref('/').child('Patients/'+user.uid+'/id_'+id).set(patientWithID)
                    .then(() => {
                        id++;
                        firebaseApp.database().ref('/').child('Users/'+user.uid+'/id').set(id)
                        .then(() => {
                            dispatch(PatientAction.patientAddedSuccess(patientWithID))
                        })
                    })
                })
            }
        } 
    }
    static getPatient = () => {
        return (dispatch) => {
            const user = firebaseApp.auth().currentUser
            if(user){
                firebaseApp.database().ref('/').child('Patients/'+user.uid)
                .once('value', (snap) => {
                    if(snap.val() === null || undefined){
                        dispatch(PatientAction.patientList({}))
                    }
                    if(snap.val() !== null || undefined){
                        dispatch(PatientAction.patientList(snap.val()))
                    }
                })
            }
        }
    }
    static deletePatient = (id) => {
        return (dispatch) => {
            const user = firebaseApp.auth().currentUser
            if(user){
                console.log(id)
                firebaseApp.database().ref('/').child('Patients/'+user.uid+'/id_'+id).remove()
                .then(() => {
                    firebaseApp.database().ref('/').child('Patients/'+user.uid)
                    .once('value', (snap) => {
                        if(snap.val() === null || undefined){
                            dispatch(PatientAction.patientList({}))
                        }
                        if(snap.val() !== null || undefined){
                            dispatch(PatientAction.patientList(snap.val()))
                        }
                        alert("Patient has been deleted");
                    })
                })
                .catch((err) => {
                    alert("Something goes wrong")
                })
            }
        }
    }
    static patientSelected = (id) => {
        return (dispatch) => {
            const user = firebaseApp.auth().currentUser
            if(user){
                firebaseApp.database().ref('/').child('Patients/'+user.uid+'/id_'+id)
                .once('value', (snap) => {
                    dispatch(PatientAction.patientSelected(snap.val()))
                })
            }
        }
    }
    static savePatient = (patient) => {
        return (dispatch) => {
            const user = firebaseApp.auth().currentUser
            if(user){
                let id = patient.id
                firebaseApp.database().ref('/').child('Patients/'+user.uid+'/id_'+id).set(patient)
                .then(() => {
                    firebaseApp.database().ref('/').child('Patients/'+user.uid)
                    .once('value', (snap) => {
                        dispatch(PatientAction.patientSaved(snap.val()))
                    })
                })
            }
        }
    }
}