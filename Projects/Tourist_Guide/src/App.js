import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import {TabNavigator, StackNavigator} from 'react-navigation';
import Login from './components/Login';
import Signup from './components/Signup';
import Map from './components/Map';

export default class App extends Component{
    render(){
        const Auth = TabNavigator({
            login: {screen: Login},
            signup: {screen: Signup},
        },{
            swipeEnabled: false,
            navigationOptions: {
                tabBarVisible: false
            },
        });
        const Main = TabNavigator({
            map: {screen: Map}
        },{
            navigationOptions: {
                tabBarVisible: false
            },
        });
        
        const MainNavigator = StackNavigator({
            auth: {screen: Auth},
            main: {screen: Main}
        },{
            headerMode: 'none'
        })
        return(
            <Provider store={store}>
                <MainNavigator />
            </Provider>
        )
    }
}