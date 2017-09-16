import * as PatientAction from '../action/patientAction';
import axios from 'axios';
import {ADD_PATIENT, GET_PATIENTS, REMOVE_PATIENT} from '../../api'

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
    static patientSelected = (id) => {
        return (dispatch) => {
            
        }
    }
    static savePatient = (patient) => {
        return (dispatch) => {
            
        }
    }
}