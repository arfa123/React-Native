import {combineReducers} from 'redux';
import {AuthReducer} from './authReducer';
import {MapReducer} from './mapReducer';
import {NavReducer} from './navReducer';

export const reducers = combineReducers({
    AuthReducer,
    MapReducer,
    NavReducer
})
