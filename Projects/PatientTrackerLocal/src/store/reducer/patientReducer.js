const InitialState = {
    patientAdded: false,
    patients: []
}

export const PatientReducer = (state = InitialState, action) => {
    switch(action.type){
        case 'PATIENT_ADDED':
            return {...state, patientAdded: true, patients: action.payload}
        case 'NEW_PATIENT':
            return {...state, patientAdded: false}
        case 'PATIENT_LIST':
            return {...state, patients: action.payload}
        default:
            return state
    }
}