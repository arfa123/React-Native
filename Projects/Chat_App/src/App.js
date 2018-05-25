import React, {Component} from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import {store} from './store';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import ChatList from './components/ChatList';
// import {Text,View} from 'react-native';

export default class App extends Component{
    render(){
        const Auth = TabNavigator({
            login: {screen: Login},
            signup: {screen: Signup}
        },{
            swipeEnabled: true,
            navigationOptions: {
                tabBarVisible: false
            }
        })
        const MainNavigator = StackNavigator({
            auth: {screen: Auth},
            home: {screen: Home}
        },
        {
            headerMode: 'none'
            // navigationOptions: {
            //     headerTitle: 
            //     <View style={{flex:1,justifyContent: "center",alignItems: "center", backgroundColor: "#add8e6"}}>
            //         <Text style={{fontSize: 40, fontWeight: 'bold'}}>CHAT APP</Text>
            //     </View>,
            //     headerStyle: {
            //         backgroundColor: '#add8e6',
            //     },
            //     headerLeft: null
            }
        );
        return(
            <Provider store={store}>
                <MainNavigator />
            </Provider>
        )
    }
}