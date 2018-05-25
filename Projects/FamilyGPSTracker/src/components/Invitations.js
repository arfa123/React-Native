import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {Left, CardItem, Card, Text, Input, Item, Form, Container, Header, Content, Footer, Body, Title, Button} from 'native-base';
import {MapMiddleware} from '../store/middlewares/mapMiddleware';

class Invitations extends Component{
    constructor(props){
        super(props)
        this.state = {
            
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
    acceptRequest(x){
        const {circleName, circleID} = x
        const circle = {
            circleName,
            circleID
        }
        this.props.acceptRequest(this.props.currentLocation, circle)
    }
    rejectRequest(x){
        this.props.rejectRequest(x)
    }
    invitationsList(){
        if(this.props.invitations !== null || undefined){
            return(
                this.props.invitations.map((x,y) => {
                    return(
                        <CardItem>
                            <Body>
                                <Text>{x.name} having email id: "{x.email}", has invited you to join the circle "{x.circleName}"</Text>
                                <Button onPress={() => this.acceptRequest(x)}>
                                    <Text>Accept</Text>
                                </Button>
                                <Button onPress={() => this.rejectRequest(x)}>
                                    <Text>Reject</Text>
                                </Button>
                            </Body>
                        </CardItem>
                    )
                })
            )
        }
        else{
            return(
                <CardItem>
                    <Body>
                        <Text>You have not any invitation</Text>
                    </Body>
                </CardItem>
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
                        <Title>Invitations</Title>
                    </Body>
                </Header>
                <Content>
                    <Card>
                        {this.invitationsList()}
                    </Card>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.AuthReducer.user,
        invitations: state.MapReducer.invitations,
        currentLocation: state.MapReducer.userLocation
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        findUser: (userEmail) => {
            dispatch(MapMiddleware.findUser(userEmail))
        },
        acceptRequest: (location, circle) => {
            dispatch(MapMiddleware.acceptRequest(location, circle))
        },
        rejectRequest: (circle) => {
            dispatch(MapMiddleware.rejectRequest(circle))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Invitations)