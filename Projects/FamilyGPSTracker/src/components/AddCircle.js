import React, {Component} from 'react';
import {BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {Title, Text, Container, Header, Content, Left, Right, Body, Input, Button, Form, Label, Item} from 'native-base';
import {MapMiddleware} from '../store/middlewares/mapMiddleware';

class AddCircle extends Component{
    constructor(props){
        super(props)
        this.state={
            circleName: ''
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
                        <Title>Create New Circle</Title>
                    </Body>
                    <Right></Right>
                </Header>
                <Content>
                    <Form>
                        <Item>
                            <Input 
                            placeholder="Enter Circle Name"
                            style={{padding: 10, fontSize: 25}}
                            onChangeText={(circleName) => this.setState({circleName})}
                            value={this.state.circleName}/> 
                        </Item>
                    </Form>
                    <Button onPress={() => this.props.addCircle(this.state.circleName,this.props.currentLocation)}>
                        <Text>Add Circle</Text>
                    </Button>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        circleAdded: state.MapReducer.circleAdded,
        currentLocation: state.MapReducer.userLocation
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        addCircle: (circleName,location) => {
            dispatch(MapMiddleware.addCircle(circleName,location))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddCircle);