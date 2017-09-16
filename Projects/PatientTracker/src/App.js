import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
import {TabNavigator, StackNavigator} from 'react-navigation';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import AddPatient from './components/AddPatient';
import FindPatient from './components/FindPatient';
import PatientDetails from './components/PatientDetails';

export class App extends Component{
    render(){
        const Auth = TabNavigator({
            login: {screen: Login},
            signup: {screen: Signup},
        },{
            navigationOptions: {
                tabBarVisible: false
            }
        },{
            swipeEnabled: false
        }
    );
        const Main = TabNavigator({
            home: {screen: Home}
        });
        const Patient = TabNavigator({
	    findpatient: {screen: FindPatient},
            addpatient: {screen: AddPatient},
            details: {screen: StackNavigator({
                patientDetails: {screen: PatientDetails}
            })}
        });
        const MainNavigator = StackNavigator({
            auth: {screen: Auth},
            main: {screen: Main},
            patient: {screen: Patient}
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