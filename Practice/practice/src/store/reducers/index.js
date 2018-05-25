import {combineReducers} from 'redux';
import {AuthReducer} from './authReducer';
import {navReducer} from './navReducer';

export const reducers = combineReducers({
    AuthReducer,
    navReducer
})