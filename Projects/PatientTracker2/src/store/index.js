import {createStore, applyMiddleware, compose} from 'redux';
import {reducers} from './reducer';
import thunk from 'redux-thunk';
import {AuthService} from './middleware/authMiddleware';

const middleware = applyMiddleware(thunk);

export const store = createStore(reducers, middleware);