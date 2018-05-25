import * as PatientAction from '../action/patientAction';
import axios from 'axios';
import {ADD_PATIENT, GET_PATIENTS, REMOVE_PATIENT, GET_PATIENT, SAVE_PATIENT} from '../../api'

export class PatientMiddleware{
    static addNewPatient = (patient) => {
        return (dispatch) => {
            axios.post(ADD_PATIENT, patient)
            .then((response) => {
                console.log("patients:",response.data.patients)
                dispatch(PatientAction.patientAddedSuccess(response.data.patients))
            })
            .catch((err) => {
                console.log("error:",err)
                dispatch(PatientAction.patientAddedFailed(err))
            })
        } 
    }
    static getPatient = (userID) => {
        return (dispatch) => {
            console.log("userid:",userID)
            axios.get(GET_PATIENTS+'?userID='+userID)
            .then((user) => {
                console.log("user:",user.data)
                dispatch(PatientAction.patientList(user.data))
            })
            .catch((err) => {
                console.log("error:",err)
            })
        }
    }
    static deletePatient = (ids) => {
        return (dispatch) => {
            console.log("id:",ids)
            axios.post(REMOVE_PATIENT, ids)
            .then((response) => {
                dispatch(PatientAction.patientList(response.data))
            })
            .catch((err) => {
                console.log('error',err)
            })
        }
    }
    static patientSelected = (ids) => {
        return (dispatch) => {
            console.log("ids:",ids)
            axios.get(GET_PATIENT+'?userID='+ids.userID+'&'+'patientID='+ids.patientID)
            .then((patient) => {
                console.log("patient:",patient.data)
                dispatch(PatientAction.patientSelected(patient.data))
            })
            .catch((err) => {
                console.log("error",err)
            })
        }
    }
    static savePatient = (patient) => {
        return (dispatch) => {
            console.log("patient:",patient)
            axios.post(SAVE_PATIENT, patient)
            .then((response) => {
                console.log('patients:',response.data)
                dispatch(PatientAction.patientSaved(response.data))
            })
            .catch((err) => {
                console.log('error:',err)
            })
        }
    }
}