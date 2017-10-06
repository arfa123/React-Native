import * as PatientAction from '../action/patientAction';
import {AsyncStorage} from 'react-native';
 
export class PatientMiddleware{
    static addNewPatient = (patient) => {
        return (dispatch) => {
            AsyncStorage.getItem('patients')
            .then((patients) => {
                let arr = JSON.parse(patients)
                console.log('io',patient)
                arr.push(patient)
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
    static patientSelected = (id) => {
        return (dispatch) => {
            AsyncStorage.getItem('patients')
            .then((patients) => {
                let selectedPatient = undefined
                let Patients = JSON.parse(patients)
                Patients.map((x,y) => {
                    if(x.id === id){
                        return selectedPatient = x
                    }
                })
                dispatch(PatientAction.patientSelected(selectedPatient))
            })
        }
    }
    static deletePatient = (id) => {
        return (dispatch) => {
            AsyncStorage.getItem('patients')
            .then((patients) => {
                let Patients = JSON.parse(patients)
                let filterPatients = Patients.filter((x,y) => {
                    return (x.id !== id)
                })
                AsyncStorage.setItem('patients', JSON.stringify(filterPatients))
                .then(() => {
                    dispatch(PatientAction.patientList(filterPatients))
                    alert("Patient removed from list")
                })
            })
        }
    }
    static savePatient = (patient) => {
        return (dispatch) => {
            AsyncStorage.getItem('patients')
            .then((patients) => {
                let Patients = JSON.parse(patients)
                let findPatient = Patients.find((x,y) => {
                    return (x.id === patient.id)
                })
                let index = Patients.indexOf(findPatient)
                Patients.splice(index, 1, patient)
                AsyncStorage.setItem('patients', JSON.stringify(Patients))
                .then(() => {
                    dispatch(PatientAction.patientSaved(Patients))
                })
            })
        }
    }
}