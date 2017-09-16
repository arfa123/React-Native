import {combineReducers} from 'redux';
import {AuthReducer} from './authReducer';
import {PatientReducer} from './patientReducer';

export const reducers = combineReducers({
    AuthenticationReducer: AuthReducer,
    PatientReducer
})