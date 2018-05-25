import React, {Component} from 'react';
import {BackHandler, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {Container,Header,Content,Form,Item,Input,Label,Right,Left,Button,Title,Body,Text,Spinner} from 'native-base';
import {AuthService} from '../store/middlewares/authMiddleware';

class Signup extends Component{
    constructor(props){
        super(props);
        this.state={
            name: '',
            email: '',
            password: ''
        }
    }
    componentDidUpdate(){
        if(this.props.isLogedIn){
            this.props.navigation.navigate('home')
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
            return(
                <Spinner color='blue'/>
            )
        }
        else{
            return(
                <Button block success large onPress={() => this.signup()}>
                    <Text>Create Account</Text>
                </Button>
            )
        }
    }
    clearMsg(){
        this.props.clearmessage()
    }
    render(){
        return(
            <Container>
                <Header>
                    <Left style={{flex:0}}/>
                        <Body style={{alignItems:'center', flex: 1}}>
                            <Title style={{fontSize: 40, fontWeight: 'bold'}}>CHAT APP</Title>
                        </Body>
                    <Right style={{flex: 0}}/>
                </Header>
                <Content>
                    <Form style={{margin: 10}}>
                        <Item stackedLabel>
                            <Label style={{color: 'red', fontSize: 20}}>Name:</Label>
                            <Input 
                            style={{padding: 10, fontSize: 25}}
                            onChangeText={(name) => this.setState({name})}
                            value={this.state.name}
                            keyboardType="email-address"
                            onFocus={() => this.clearMsg()}
                            />
                        </Item>
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
                    <Button small block transparent onPress={() => this.props.navigation.navigate('login')}>
                        <Text style={{fontSize: 20}}>Already have account?</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.AuthReducer.user,
        error: state.AuthReducer.errorMessage,
        isLogedIn: state.AuthReducer.isLogin,
        loader: state.AuthReducer.loader
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