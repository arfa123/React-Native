import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import {connect} from 'react-redux';
import {CardItem, Card, Text, Input, Item, Form, Container, Header, Content, Footer, Body, Title, Button} from 'native-base';
import {MapMiddleware} from '../store/middlewares/mapMiddleware';

class Invitations extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    componentDidMount(){
        console.log("invitations:",this.props.invitations)
    }
    componentDidUpdate(){
        console.log("invitations:",this.props.invitations)
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
        console.log("circle:",x)
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Invitations)