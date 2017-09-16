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