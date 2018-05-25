import {combineReducers} from 'redux';
import {AuthReducer} from './authReducer';
import {PatientReducer} from './patientReducer';
import {NavReducer} from './navReducer';

export const reducers = combineReducers({
    AuthenticationReducer: AuthReducer,
    PatientReducer,
    NavReducer
})