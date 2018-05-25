import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import AppWithNavigationState from './AppNavigator';


export default class App extends Component{
    render(){
        return(
            <Provider store={store}>
                <AppWithNavigationState />
            </Provider>
        )
    }
}