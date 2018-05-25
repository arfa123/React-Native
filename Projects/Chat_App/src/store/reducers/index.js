import {combineReducers} from 'redux';
import {AuthReducer} from './authReducer';
import {ChatReducer} from './chatReducer';

export const reducers = combineReducers({
    AuthReducer,
    ChatReducer
})