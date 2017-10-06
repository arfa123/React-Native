import React, { Component } from 'react';
import {View, Text, Button, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {Header} from './common';

class Login extends Component{
    constructor(props){
        super(props)

    }
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", () => {
            console.log('login back press')
            BackHandler.exitApp()
            return true
        });
    }
      componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", () => {
            console.log('login  remove back press')
        });
    }

    signup(){
        this.props.navigation.dispatch(
            NavigationActions.navigate({
                routeName: 'signup'
            })
        )
    }
    home(){
        this.props.navigation.dispatch(
            NavigationActions.navigate({
                routeName: 'home'
            })
        )
    }
    render(){
        return(
            <View>
                <Header headerText="Login" />
                <Text>Login</Text>
                <Text>Login</Text>
                
                <Button
                onPress={() => this.signup()}
                title="Signup"
                color="#841584"
                />
                <Button
                onPress={() => this.home()}
                title="Home"
                color="#841584"
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps)(Login);