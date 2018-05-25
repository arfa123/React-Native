import React, { Component } from 'react';
import { View } from 'react-native';
import {connect} from 'react-redux';
import {StackNavigator, TabNavigator, addNavigationHelpers} from 'react-navigation';
import Login from './components/Login';
import Signup from './components/Signup';
import Map from './components/Map';
import AddCircle from './components/AddCircle';
import Invite from './components/Invite';
import Invitations from './components/Invitations';

// const Auth = TabNavigator({
//     login: {screen: Login},
//     signup: {screen: Signup},
// },{
//     swipeEnabled: false,
//     navigationOptions: {
//         tabBarVisible: false
//     }
// });

// const Home = TabNavigator({
//     map: {screen: Map},
//     addcircle: {screen: AddCircle},
//     invite: {screen: Invite}
// },{
//     swipeEnabled: false,
//     navigationOptions: {
//         tabBarVisible: false
//     }
// });

export const AppNavigator = StackNavigator({
    login: {screen: Login},
    signup: {screen: Signup},
    map: {screen: Map},
    addcircle: {screen: AddCircle},
    invite: {screen: Invite},
    invitations: {screen: Invitations}
},{
    headerMode: 'none'
});

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
        nav: state.NavReducer
    }
}
export default connect(mapStateToProps)(AppWithNavigationState);