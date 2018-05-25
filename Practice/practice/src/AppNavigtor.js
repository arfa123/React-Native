import React, { Component } from 'react';
import { View } from 'react-native';
import {connect} from 'react-redux';
import {StackNavigator, TabNavigator, addNavigationHelpers} from 'react-navigation';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Find from './components/Find';
import Add from './components/Add';
import Details from './components/Details';

const Auth = TabNavigator({
    login: {screen: Login},
    signup: {screen: Signup}
})
const Main = TabNavigator({
    home: {screen: Home}
})
const Patient = TabNavigator({
    find: {screen: Find},
    add: {screen: Add}
})

export const AppNavigator = StackNavigator({
    auth: {screen: Auth},
    main: {screen: Main},
    patient: {screen: Patient},
    details: {screen: Details}
})

class AppWithNavigationState extends Component {
    render(){
        return(
            <AppNavigator 
            navigation = {addNavigationHelpers({
                dispatch: this.props.dispatch,
                state: this.props.nav
            })}
            />
        )
    }
}
const mapStateToProps = (state) => {
    return {
        nav: state.navReducer
    }
}
export default connect(mapStateToProps)(AppWithNavigationState);