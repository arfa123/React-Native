import React, { Component } from 'react';
import {View, Text, Button, BackHandler, TimePickerAndroid} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {Header, Input} from './common';

class Add extends Component{
    constructor(props){
        super(props)
        this.state = {
            time: ''
        }
    }
    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", () => {
            console.log('add back press')
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
    componentDidUpdate(){
        console.log("timeSet:",this.state.time)
    }
    async setTime(){
        try {
            let {action, hour, minute} = await TimePickerAndroid.open({
                is24Hour: false
            });
            if (action === TimePickerAndroid.timeSetAction) {
                let midday = undefined
                console.log("time:",hour, minute)
                if(hour > 12){
                    hour = hour - 12
                    midday = 'PM'
                }
                else if(hour == 0){
                    hour = 12
                    midday = 'AM'
                }
                else if(hour == 12){
                    hour = 12
                    midday = 'PM'
                }
                else if(hour < 12){
                    midday = 'AM'
                }
                this.setState({
                    time: hour+':'+minute+' '+midday
                })
            }
        } catch ({code, message}) {
            console.warn('Cannot open time picker', message);
        }
    }
    render(){
        return(
            <View>
                <Header headerText="Add" />
                <Text>Add</Text>
                <Text>Login</Text>
                <Input 
                label="Set time"
                onFocus={() => this.setTime()}
                value={this.state.time}
                onChangeText={(time) => this.setState({time})}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps)(Add);