import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {CardItem, Card, Text, Input, Item, Form, Container, Header, Content, Footer, Body, Title, Button} from 'native-base';
import {MapMiddleware} from '../store/middlewares/mapMiddleware';

class Invite extends Component{
    constructor(props){
        super(props)
        this.state = {
            userEmail: ''
        }
    }
    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.goBack()
            return true
        })
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress')
    }
    goBack(){
        this.props.navigation.dispatch(
            NavigationActions.navigate({
                routeName: 'map'
            })
        )
    }
    sendInvitation(){
        const {user, findedUser, selectedCircle} = this.props
        this.props.sendInvitation(user, findedUser, selectedCircle)
    }
    user(){
        if(this.props.findedUser !== undefined || null){
            return(
                <Card>
                    <CardItem>
                        <Body>
                            <Text>{this.props.findedUser.name}</Text>
                            <Text>{this.props.findedUser.email}</Text>
                            <Button onPress={() => this.sendInvitation()}>
                                <Text>Send Invitation</Text>
                            </Button>
                        </Body>
                    </CardItem>
                </Card>        
            )
        }
    }
    render(){
        return(
            <Container>
                <Header>
                    <Left>
                        <Button onPress={() => this.goBack()}>
                            <Text>Back</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Invite To This Circle</Title>
                    </Body>
                </Header>
                <Content>
                    <Form>
                        <Item>
                            <Input 
                            placeholder="Enter User Email you want to invite"
                            style={{padding: 10, fontSize: 25}}
                            onChangeText={(userEmail) => this.setState({userEmail})}
                            value={this.state.userEmail}/> 
                        </Item>
                    </Form>
                    <Button onPress={() => this.props.findUser(this.state.userEmail)}>
                        <Text>Find</Text>
                    </Button>
                    {this.user()}
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.AuthReducer.user,
        selectedCircle: state.MapReducer.selectedCircle,
        findedUser: state.MapReducer.findedUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        findUser: (userEmail) => {
            dispatch(MapMiddleware.findUser(userEmail))
        },
        sendInvitation: (sender, reciever, circle) => {
            dispatch(MapMiddleware.sendInvitation(sender, reciever, circle))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Invite)