import React, { Component } from 'react';
import { View } from 'react-native';
import {connect} from 'react-redux';
import {StackNavigator, TabNavigator, addNavigationHelpers} from 'react-navigation';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import AddPatient from './components/AddPatient';
import FindPatient from './components/FindPatient';
import PatientDetails from './components/PatientDetails';

const Auth = TabNavigator({
    login: {screen: Login},
    signup: {screen: Signup},
},{
    swipeEnabled: false,
    navigationOptions: {
        tabBarVisible: false
    }
});
const Patient = TabNavigator({
    findpatient: {screen: FindPatient},
    addpatient: {screen: AddPatient},
},{
    swipeEnabled: false,
    navigationOptions: {
        tabBarVisible: false
    }
});

export const AppNavigator = StackNavigator({
    auth: {screen: Auth},
    home: {screen: Home},
    patient: {screen: Patient},
    patientDetails: {screen: PatientDetails}
},{
    headerMode: 'none'
})

class AppWithNavigationState extends Component{
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
        nav: state.NavReducer
    }
}
export default connect(mapStateToProps)(AppWithNavigationState);