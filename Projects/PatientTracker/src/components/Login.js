import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Card,Button} from 'react-native-elements';
import {Heading, Header, CardSection, Link, Spinner, Input} from './common';
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
        this.onAuthComplete(this.props)
    }
    componentDidUpdate(){
        this.setState({errorMessage: this.props.error.message})
    }
    componentWillReceiveProps(nextProps){
        this.onAuthComplete(nextProps)
    }
    onAuthComplete(props){
        if(props.isLogedIn){
            this.props.navigation.navigate('home')
        }
    }
    login(){
        this.props.loading()
        let user = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.login(user)
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
    render(){
        const {navigate} = this.props.navigation;
        return(
            <View>
                <Header headerText="Patient Tracker"/>
                <Card 
                title="Login"
                titleStyle={{fontSize:30}}
                wrapperStyle={{backgroundColor: '#ffffff'}}
                containerStyle={{borderWidth: 2, borderColor: 'green', borderRadius:5}}>
                    <CardSection>
                            <Input
                            label="Email:"
                            onChangeText={(email) => this.setState({email})}
                            keyboardType="email-address"
                            placeholder="Enter Email"
                            onFocus={() => this.props.clearmessage()}
                            />
                    </CardSection>
                    <CardSection>
                        <Input
                        label="Password:"
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
                    <Link onPress={() => navigate('signup')}>Create a new account</Link>
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