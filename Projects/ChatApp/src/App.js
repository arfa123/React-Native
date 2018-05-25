import React, {Component} from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import {store} from './store';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';

export default class App extends Component{
    render(){
        const Auth = TabNavigator({
            login: {screen: Login},
            signup: {screen: Signup}
        });

        const MainNavigator = StackNavigator({
            auth: {screen: Auth},
            home: {screen: Home}
        });
        return(
            <Provider store={store}>
                <MainNavigator />
            </Provider>
        )
    }
}