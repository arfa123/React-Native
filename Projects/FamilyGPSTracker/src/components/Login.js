import React, {Component} from 'react';
import {TouchableOpacity, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {CardItem, Text, Container, Header, Title, Content, Footer, Item, Left, Right, Input, Label, Body, Badge, Button, Form, Card, Spinner} from 'native-base';
import {AuthService} from '../store/middlewares/authMiddleware';
import {firebaseApp} from '../Firebase';

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }
    componentWillMount(){
        // firebaseApp.auth().onAuthStateChanged((user) => {
        //     console.log("user:",user,this.props.user)
        //     if(user){
        //         this.props.redirect({name: user.displayName, email: user.email, uid: user.uid})
        //         this.props.navigation.dispatch(
        //             NavigationActions.navigate({
        //                 routeName: 'map'
        //             })
        //         )
        //     }
        // })
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
        // if(this.props.isLogedIn){
        //     this.props.navigation.dispatch(
        //         NavigationActions.navigate({
        //             routeName: 'map'
        //         })
        //     )
        // }
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
            return(
            <Spinner color='blue'/>
        )
        }
        else{
            return(
            <Button block success large onPress={() => this.login()}>
                <Text>Login</Text>
            </Button>
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
            <Container>
                <Header backgroundColor="#4CAF50">
                    <Left style={{flex:0}}/>
                    <Body style={{alignItems:'center', flex: 1}}>
                        <Title style={{fontSize: 40, fontWeight: 'bold'}}>Family Tracker</Title>
                    </Body>
                    <Right style={{flex: 0}}/>
                </Header>
                <Content padder>
                    <Form style={{margin: 10}}>
                        <Item stackedLabel>
                            <Label style={{color: 'red', fontSize: 20}}>Email:</Label>
                            <Input 
                            style={{padding: 10, fontSize: 25}}
                            onChangeText={(email) => this.setState({email})}
                            value={this.state.email}
                            keyboardType="email-address"
                            onFocus={() => this.clearMsg()}
                            />
                        </Item>
                        <Item stackedLabel>
                            <Label style={{color: 'red', fontSize: 20}}>Password:</Label>
                            <Input 
                            style={{padding: 10, fontSize: 25}}
                            onChangeText={(password) => this.setState({password})}
                            value={this.state.password}
                            onFocus={() => this.clearMsg()}
                            secureTextEntry
                            />
                        </Item>
                    </Form>
                    {this.loader()}
                    <Text style={{color: 'red', fontSize: 20}}>{this.props.error.message}</Text>
                    <Button small block transparent onPress={() => this.signup()}>
                        <Text style={{fontSize: 20}}>Create a new account</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        user: state.AuthReducer.user,
        error: state.AuthReducer.errorMessage,
        isLogedIn: state.AuthReducer.isLogin,
        loader: state.AuthReducer.loader
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
        },
        redirect: (user) => {
            return dispatch({type: 'REDIRECT', payload: user})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);