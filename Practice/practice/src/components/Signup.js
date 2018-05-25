import React, { Component } from 'react';
import {View, Text, Button, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {Header} from './common';

class Signup extends Component{
    constructor(props){
        super(props)

    }
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", () => {
            console.log('signup back press')
            // BackHandler.exitApp()
            return false
        });
    }
      componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", () => {
            console.log('signup remove back press')
        });
    }
    render(){
        return(
            <View>
                <Header headerText="Signup" />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps)(Signup);