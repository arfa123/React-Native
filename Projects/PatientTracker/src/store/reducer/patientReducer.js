const InitialState = {
    patientAdded: false,
    patientSaved: false,
    patients: [],
    selectedPatient: undefined
}

export const PatientReducer = (state = InitialState, action) => {
    switch(action.type){
        case 'PATIENT_ADDED':
            return {...state, patientAdded: true, selectedPatient: undefined}
        case 'NEW_PATIENT':
            return {...state, patientAdded: false, selectedPatient: undefined}
        case 'PATIENT_LIST':
            return {...InitialState, patients: Object.values(action.payload)}
        case 'PATIENT_SELECTED':
            return {...state, selectedPatient: action.payload}
        case 'PATIENT_SAVED':
            return {...state, patients: Object.values(action.payload), patientSaved: true}
        case 'EDIT_PATIENT':
            return {...state, patientSaved: false}
        default:
            return state
    }
}