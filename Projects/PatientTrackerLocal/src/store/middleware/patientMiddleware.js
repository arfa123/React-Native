import * as PatientAction from '../action/patientAction';
import {AsyncStorage} from 'react-native';
 
export class PatientMiddleware{
    static addNewPatient = (patient) => {
        return (dispatch) => {
            AsyncStorage.getItem('patients')
            .then((patients) => {
                let arr = JSON.parse(patients)
                let patientWithID = {...patient, id: arr.length}
                console.log('io',patientWithID)
                arr.push(patientWithID)
                AsyncStorage.setItem('patients',JSON.stringify(arr))
                .then(() => {
                    dispatch(PatientAction.patientAddedSuccess(arr))
                })
            })
        } 
    }
    static getPatient = () => {
        return (dispatch) => {
            AsyncStorage.getItem('patients')
            .then((patients) => {
                dispatch(PatientAction.patientList(JSON.parse(patients)))
            })
        }
    }
}