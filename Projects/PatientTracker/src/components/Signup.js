import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Card,Button} from 'react-native-elements';
import {Heading, Header, CardSection, Input, Link, Spinner} from './common';
import {AuthService} from '../store/middleware/authMiddleware';
import {firebaseApp} from '../Firebase';

class Signup extends Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            errorMessage: this.props.error.message
        }
    }
    componentDidMount(){
        this.onAuthComplete(this.props)
    }
    componentWillReceiveProps(nextProps){
        this.onAuthComplete(nextProps)
    }
    onAuthComplete(props){
        if(props.isLogedIn){
            this.props.navigation.navigate('home');
        }
    }
    signup(){
        this.props.loading()
        let user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            id: 0
        }
        this.props.signup(user)
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
    render(){
        const {navigate} = this.props.navigation;
        return(
            <View>
                <Header headerText="Patient Tracker"/>
                <Card 
                title="Sign Up"
                titleStyle={{fontSize:30}}
                wrapperStyle={{backgroundColor: '#ffffff'}}
                containerStyle={{borderWidth: 2, borderColor: 'green', borderRadius:5}}>
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
                        onFocus={() => this.setState({errorMessage: ''})}
                        />
                    </CardSection>
                    <CardSection>
                        <Input 
                        label="Password" 
                        placeholder="Enter Password" 
                        secureTextEntry
                        onChangeText={(password) => this.setState({password})}
                        onFocus={() => this.setState({errorMessage: ''})}
                        />
                    </CardSection>
                    <CardSection>
                        {this.loader()}
                    </CardSection>
                    <CardSection>
                        <View>
                            <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
                        </View>
                    </CardSection>
                </Card>
                <View>
                    <Link onPress={() => navigate('login')}>Already have Account?</Link>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.AuthenticationReducer.user,
        error: state.AuthenticationReducer.errorMessage,
        isLogedIn: state.AuthenticationReducer.isLogin
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        loading: () => {
            return dispatch({type: 'LOADING'})
        },
        signup: (user) => {
            return dispatch(AuthService.signupUser(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);