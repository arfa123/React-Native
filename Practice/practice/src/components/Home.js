import React, { Component } from 'react';
import {View, Text, Button, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {Header} from './common';

class Home extends Component{
    constructor(props){
        super(props)

    }
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", () => {
            console.log('home back press')
            this.props.navigation.dispatch(
                NavigationActions.navigate({
                    routeName: 'login'
                })
            )
            return true
        });
    }
    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", () => {
            console.log('home remove back press')
        });
    }
    find(){
        this.props.navigation.dispatch(
            NavigationActions.navigate({
                routeName: 'find'
            })
        )
    }
    add(){
        this.props.navigation.dispatch(
            NavigationActions.navigate({
                routeName: 'add'
            })
        )
    }
    render(){
        return(
            <View>
                <Header headerText="Home" />
                <Button
                onPress={() => this.find()}
                title="Find"
                color="#841584"
                />
                <Button
                onPress={() => this.add()}
                title="Add"
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

export default connect(mapStateToProps)(Home);