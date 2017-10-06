import React, { Component } from 'react';
import {View, Text, Button, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {Header} from './common';

class Find extends Component{
    constructor(props){
        super(props)

    }
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", () => {
            console.log('find back press')
            this.props.navigation.dispatch(
                NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: 'main'
                        })
                    ]
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
    details(){
        this.props.navigation.dispatch(
            NavigationActions.navigate({
                routeName: 'details'
            })
        )
    }
    render(){
        return(
            <View>
                <Header headerText="Find" />
                <Text>Find</Text>
                <Text>Login</Text>
                <Button
                onPress={() => this.details()}
                title="Details"
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

export default connect(mapStateToProps)(Find);