import React, {Component} from 'react';
import {View, Text, TouchableOpacity, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {Card, Button, Header} from 'react-native-elements';
import {CardSection, Input, Link, Spinner} from './common';
import {AuthService} from '../store/middleware/authMiddleware';

class Signup extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }
    componentDidMount(){
        this.onAuthComplete(this.props)
        BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp()
            return true
        })
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress')
    }
    componentWillReceiveProps(nextProps){
        this.onAuthComplete(nextProps)
    }
    onAuthComplete(props){
        if(props.isLogedIn){
            this.props.navigation.dispatch(
                NavigationActions.navigate({
                    routeName: 'home'
                })
            )
        }
    }
    signup(){
        if(this.state.name && this.state.email && this.state.password !== ''){
            this.props.loading()
            let user = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            }
            this.props.signup(user)
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
                    title="Create New Account"
                    onPress={() => this.signup()}
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
    login(){
        this.props.navigation.dispatch(
            NavigationActions.navigate({
                routeName: 'login'
            })
        )
    }
    render(){
        return(
            <View>
                <Header 
                backgroundColor="blue"
                centerComponent={{ text: 'PATIENT TRACKER 2', style: { color: '#fff' ,fontSize: 30, fontWeight: 'bold'} }} 
                 />
                <Card 
                title="Sign Up"
                titleStyle={{fontSize:30}}
                wrapperStyle={{backgroundColor: '#ffffff'}}
                containerStyle={{marginTop: 80, borderWidth: 2, borderColor: 'green', borderRadius:5}}>
                    <CardSection>
                        <Input 
                        label="Name:"
                        placeholder="Enter Name"
                        onChangeText={(name) => this.setState({name})}
                        onFocus={() => this.setState({errorMessage: ''})}
                        />
                    </CardSection>
                    <CardSection>
                        <Input 
                        label="Email:" 
                        placeholder="Enter Email" 
                        onChangeText={(email) => this.setState({email})}
                        onFocus={() => this.props.clearmessage()}
                        />
                    </CardSection>
                    <CardSection>
                        <Input 
                        label="Password" 
                        placeholder="Enter Password" 
                        secureTextEntry
                        onChangeText={(password) => this.setState({password})}
                        onFocus={() => this.props.clearmessage()}
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
                    <Link onPress={() => this.login()}>Already have Account?</Link>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.AuthenticationReducer.user,
        error: state.AuthenticationReducer,
        isLogedIn: state.AuthenticationReducer.isLogin,
        loader: state.AuthenticationReducer.loader
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loading: () => {
            return dispatch({type: 'LOADING'})
        },
        signup: (user) => {
            return dispatch(AuthService.signupUser(user))
        },
        clearmessage: () => {
            return dispatch({type: 'CLEAR_MSG'})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);