import React, {Component} from 'react';
import {View, Text, AsyncStorage, TouchableOpacity, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {Card, Button, Header} from 'react-native-elements';
import {CardSection, Input} from './common';
import {AuthService} from '../store/middleware/authMiddleware';

class Signup extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
        }
    }
    componentWillMount(){
        AsyncStorage.getItem('userRegistered')
        .then((userReg) => {
            let x = JSON.parse(userReg)
            console.log(x.userReg)
            if(x.userReg){
                this.props.navigation.dispatch(
                    NavigationActions.navigate({
                        routeName: 'home'
                    })
                )
            }
        })
    }
    componentDidUpdate(){
        if(this.props.isRegistered){
            this.props.navigation.dispatch(
                NavigationActions.navigate({
                    routeName: 'home'
                })
            )
        }
    }
    onSignup(){
        if(this.state.name !== ''){
            let user = {
                name: this.state.name
            }
            this.props.signup(user)
        }
        else{
            alert("Please fill input fields")
        }
    }
    render(){
        return(
            <View>
                <Header 
                backgroundColor="blue"
                centerComponent={{ text: 'PATIENT TRACKER LOCAL', style: { color: '#fff' ,fontSize: 25, fontWeight: 'bold'} }} 
                 />
                <Card
                title="Register"
                titleStyle={{fontSize:30}}
                wrapperStyle={{backgroundColor: '#ffffff'}}
                containerStyle={{marginTop: 80, borderWidth: 2, borderColor: 'green', borderRadius:5}}>
                    <CardSection>
                        <Input 
                        label="Name:"
                        placeholder="Enter Name"
                        onChangeText={(name) => this.setState({name})}
                        />
                    </CardSection>
                    <CardSection>
                        <Button 
                        Component={TouchableOpacity}
                        title="Register"
                        color="#ffffff"
                        fontSize= {24}
                        fontWeight="bold"
                        backgroundColor="green"
                        containerViewStyle={{
                            backgroundColor:'#ffffff',
                            alignSelf: 'stretch', 
                            flex: 1,
                            borderRadius: 2,
                            borderWidth: 2,
                            borderColor: 'green',
                            margin: 5}}
                        onPress={() => this.onSignup()}
                        />
                    </CardSection>
                </Card>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.AuthenticationReducer.user,
        isRegistered: state.AuthenticationReducer.isRegistered
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signup: (user) => {
            return dispatch(AuthService.signupUser(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);