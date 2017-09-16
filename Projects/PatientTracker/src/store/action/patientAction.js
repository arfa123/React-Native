export const patientAddedSuccess = (patient) => {
    return {
        type: 'PATIENT_ADDED',
        payload: patient
    }
}
export const patientAddedFailed = (error) => {
    return {
        type: 'PATIENT_FAILED',
        payload: error
    }
}
export const patientList = (patients) => {
    return {
        type: 'PATIENT_LIST',
        payload: patients
    }
}
export const patientRemoved = (id) => {
    return {
        type: 'PATIENT_REMOVED',
        payload: id
    }
}
export const patientSelected = (patient) => {
    return {
        type: 'PATIENT_SELECTED',
        payload: patient
    }
}
export const patientSaved = (patients) => {
    return {
        type: 'PATIENT_SAVED',
        payload: patients
    }
}