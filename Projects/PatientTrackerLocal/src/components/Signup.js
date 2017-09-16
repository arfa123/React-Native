import React, {Component} from 'react';
import {View, Text, AsyncStorage, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Card, Button} from 'react-native-elements';
import {Header, CardSection, Input, Link} from './common';
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
                this.props.navigation.navigate('home')
            }
        })
    }
    componentDidUpdate(){
        console.log("pop",this.props.isRegistered)
        if(this.props.isRegistered){
            this.props.navigation.navigate('home')
        }
    }
    onSignup(){
        let user = {
            name: this.state.name
        }
        this.props.signup(user)
    }
    render(){
        const {navigate} = this.props.navigation;
        return(
            <View>
                <Header headerText="Patient Tracker Local"/>
                <Card
                title="Regiter"
                titleStyle={{fontSize:30}}
                wrapperStyle={{backgroundColor: '#ffffff'}}
                containerStyle={{borderWidth: 2, borderColor: 'green', borderRadius:5}}>
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