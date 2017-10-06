const InitialState = {
    patientAdded: false,
    patientSaved: false,
    patients: [],
    selectedPatient: undefined
}

export const PatientReducer = (state = InitialState, action) => {
    switch(action.type){
        case 'PATIENT_ADDED':
            return {...state, patientAdded: true}
        case 'NEW_PATIENT':
            return {...state, patientAdded: false}
        case 'PATIENT_LIST':
            return {...InitialState, patients: action.payload}
        case 'PATIENT_SELECTED':
            return {...state, selectedPatient: action.payload}
        case 'PATIENT_SAVED':
            return {...state, patients: action.payload, patientSaved: true}
        case 'EDIT_PATIENT':
            return {...state, patientSaved: false}
        default:
            return state
    }
}