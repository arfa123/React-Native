import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {Container,Header,Content,Form,Item,Input,Label,Right,Left,Button,Title,Body,Text,Spinner} from 'native-base';
import {AuthService} from '../store/middlewares/authMiddleware';

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            email: '',
            password: ''
        }
    }
    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp()
            return true
        })
    }
    componentDidMount(){
        if(this.props.isLogedIn){
            alert("cm")
            this.props.navigation.navigate('home')
        }
    }
    login(){
        if(this.state.email && this.state.password !== ''){
            this.props.loading()
            let user = {
                email: this.state.email,
                password: this.state.password
            }
            console.log("hello")
            // alert("hello",user)
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
        this.props.clearMsg()
    }
    render(){
        return(
            <Container>
                <Header>
                    <Left style={{flex:0}}/>
                        <Body style={{alignItems:'center', flex: 1}}>
                            <Title style={{fontSize: 40, fontWeight: 'bold'}}>CHAT cvcvAPP</Title>
                        </Body>
                    <Right style={{flex: 0}}/>
                </Header>
                <Content>
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
                    <Text style={{color: 'red', fontSize: 20}}>
                        {this.props.error.message}
                    </Text>
                    <Button small block transparent onPress={() => this.props.navigation.navigate('signup')}>
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
        isLogedin: state.AuthReducer.isLogin,
        error: state.AuthReducer.errorMessage,
        loader: state.AuthReducer.loader,

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
        clearMsg: () => {
            return dispatch({type: 'CLR_MSG'})
        }
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Login);