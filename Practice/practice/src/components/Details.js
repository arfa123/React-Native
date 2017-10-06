import React, { Component } from 'react';
import {View, Text, Button, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {Header} from './common';

class Details extends Component{
    constructor(props){
        super(props)

    }
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", () => {
            console.log('details back press')
            this.props.navigation.dispatch(
                NavigationActions.navigate({
                    routeName: 'find'
                })
            )
            return true
        });
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", () => {
            console.log('find remove back press')
        });
    }
    render(){
        return(
            <View>
                <Header headerText="Details" />
                <Text>Find</Text>
                <Text>Login</Text>
                
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps)(Details);