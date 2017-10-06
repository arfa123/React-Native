import {combineReducers} from 'redux';
import {AuthReducer} from './authReducer';
import {MapReducer} from './mapReducer';

export const reducers = combineReducers({
    AuthReducer,
    MapReducer
})