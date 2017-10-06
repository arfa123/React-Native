import React, {Component} from 'react';
import {View, Text, TouchableOpacity, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {Card, Button, Header} from 'react-native-elements';
import {CardSection, Link, Spinner, Input} from './common';
import {AuthService} from '../store/middleware/authMiddleware';

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp()
            return true
        })
    }
    componentWillUnmount(){
        NavigationActions.reset({
            index: 0
        })
        BackHandler.removeEventListener('hardwareBackPress')
    }
    componentDidUpdate(){
        if(this.props.isLogedIn){
            this.props.navigation.dispatch(
                NavigationActions.navigate({
                    routeName: 'home'
                })
            )
        }
    }
    login(){
        if(this.state.email && this.state.password !== ''){
            this.props.loading()
            let user = {
                email: this.state.email,
                password: this.state.password
            }
            this.props.login(user)
        }
        else{
            alert("Please fill all input fields")
        }
    }
    loader(){
        if(this.props.loader){
            return(<Spinner />)
        }
        else{
            return(
                    <Button 
                    Component={TouchableOpacity}
                    title="Login"
                    onPress={() => this.login()}
                    color="#ffffff"
                    fontSize= {24}
                    fontWeight="bold"
                    backgroundColor="blue"
                    containerViewStyle={{
                        backgroundColor:'#ffffff',
                        alignSelf: 'stretch', 
                        flex: 1,
                        borderRadius: 2,
                        borderWidth: 2,
                        borderColor: 'blue',
                        margin: 5}}
                    />
            )
        }
    }
    clearMsg(){
        this.props.clearmessage()
    }
    signup(){
        this.props.navigation.dispatch(
            NavigationActions.navigate({
                routeName: 'auth',
                action: NavigationActions.navigate({ routeName: 'signup'})
            })
        )
    }
    render(){
        return(
            <View>
                <Header 
                backgroundColor="blue"
                centerComponent={{ text: 'PATIENT TRACKER', style: { color: '#fff' ,fontSize: 30, fontWeight: 'bold'} }} 
                 />
                <Card 
                title="Login"
                titleStyle={{fontSize:30}}
                wrapperStyle={{backgroundColor: '#ffffff'}}
                containerStyle={{borderWidth: 2, borderColor: 'green', borderRadius:5, marginTop: 80}}>
                    <CardSection>
                        <Input
                        label="Email:"
                        onChangeText={(email) => this.setState({email})}
                        keyboardType="email-address"
                        placeholder="Enter Email"
                        onFocus={() => this.clearMsg()}
                        />
                    </CardSection>
                    <CardSection>
                        <Input
                        label="Password:"
                        placeholder="Enter Password" 
                        secureTextEntry
                        onChangeText={(password) => this.setState({password})}
                        onFocus={() => this.clearMsg()}
                        />
                    </CardSection>
                    <CardSection>
                        {this.loader()}
                    </CardSection>
                    <CardSection>
                        <View>
                            <Text style={{color: 'red'}}>{this.props.error.message}</Text>
                        </View>
                    </CardSection>
                </Card>
                <View>
                    <Link onPress={() => this.signup()}>Create a new account</Link>
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        user: state.AuthenticationReducer.user,
        error: state.AuthenticationReducer.errorMessage,
        isLogedIn: state.AuthenticationReducer.isLogin,
        loader: state.AuthenticationReducer.loader
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        loading: () => {
            return dispatch({type: 'LOADING'})
        },
        login: (user) => {
            return dispatch(AuthService.loginUser(user))
        },
        clearmessage: () => {
            return dispatch({type: 'CLEAR_MSG'})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);