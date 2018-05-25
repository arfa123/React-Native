import React, { Component } from 'react';
import { View, Modal, StyleSheet, Dimensions, BackHandler } from 'react-native';
import MapView from 'react-native-maps';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {Picker, FooterTab, Icon, Text, Container, Header, Title, Content, Footer, Item, Left, Right, Label, Body, Button, Form} from 'native-base';
import {MapMiddleware} from '../store/middlewares/mapMiddleware';
import {firebaseApp} from '../Firebase';

const { width, height } = Dimensions.get('window');
const ratio = width / height;
class Map extends Component{
    constructor(props){
        super(props)
        this.state = {
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0922 * ratio,
            error: '',
            circleType: undefined,
            selectedCircle: undefined
        }
    }
    componentWillMount(){
        navigator.geolocation.getCurrentPosition((position) => {
            console.log("posi:",position)
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
            this.props.getCircles(this.props.user.uid, {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        },(error) => {
            console.log("err:",error)
            this.setState({error: error.message})
        },{
            enableHighAccuracy: true
        })
        navigator.geolocation.watchPosition((position) => {
            console.log("position change:",position)
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
            this.props.getCircles(this.props.user.uid, {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        },(error) => {
            console.log("error:",error)
            this.setState({error: error.message})
        })
        BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp()
            return true
        })
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress')
    }
    componentDidMount(){
        firebaseApp.auth().onAuthStateChanged((user) => {
            if(!user){
                this.props.navigation.dispatch(
                    NavigationActions.navigate({
                        routeName: 'login'
                    })
                )
            }
        })
    }
    addCircle(){
        this.props.newCircle()
    }
    signout(){
        firebaseApp.auth().signOut()
        .then(() => {
            this.props.logOut()
        })
    }
    invite(){
        this.props.invite(this.state.selectedCircle)
    }
    circles(){
        if(this.state.circleType === 'createdCircles'){
            if(this.props.createdCircles !== null || undefined){
                console.log("circles:",this.props.createdCircles)
                return(
                    this.props.createdCircles.map((x,y) => {
                        if(y === 0){
                            return(
                                <Item label={x} disabled/>
                            )
                        }
                        return(
                            <Item label={x.circleName} value={x}/>
                            )
                        })
                )
            }
        }
        else if(this.state.circleType === 'memberCircles'){
            if(this.props.memberCircles !== null || undefined){
                console.log("circles:",this.props.memberCircles)
                return(
                    this.props.memberCircles.map((x,y) => {
                        if(y === 0){
                            return(
                                <Item label={x} disabled/>
                            )
                        }
                        return(
                            <Item label={x.circleName} value={x} />
                        )
                    })
                )
            }
        }
    }
    getMembers(selectedCircle){
        if(selectedCircle !== null || undefined){
            this.setState({
                selectedCircle
            })
            this.props.getMembers(selectedCircle)
        }
    }
    renderMembers(){
        if(this.props.circleMembers !== null || undefined){
            return(
                this.props.circleMembers.map((x,y) => {
                    return(
                        <MapView.Marker 
                        title={x.user.name}
                        coordinate={{
                            latitude: x.location.latitude,
                            longitude: x.location.longitude
                        }}
                        />
                    )
                })
            )
        }
    }
    footer(){
        if(this.state.circleType === 'createdCircles'){
            if(this.props.createdCircles !== null || undefined){
                return(
                    <Button onPress={() => this.invite()}>
                        <Text>Invite Someone To This Circle</Text>
                    </Button> 
                )
            }
        }
    }
    render(){
        const { width, height } = Dimensions.get('window');
        return(
            <Container>
                <Header>
                    
                    <Body>
                        <Title>Family GPS Tracker</Title>
                    </Body>
                    <Right>
                        <Button onPress={() => this.signout()}>
                            <Text>Logout</Text>
                        </Button>
                    </Right>
                </Header>
                <Content scrollEnabled={false}>
                        <Form>
                            <Picker
                            mode="dropdown"
                            placeholder="Circles"
                            selectedValue={this.state.selectedCircle}
                            onValueChange={(selectedCircle) => this.getMembers(selectedCircle)}>
                                {this.circles()}
                            </Picker>
                            <Picker
                            mode="dropdown"
                            selectedValue={this.state.circleType}
                            onValueChange={(circleType) => this.setState({circleType})}>
                                <Item label="Select Circle type" />
                                <Item label="Created Circles" value="createdCircles"/>
                                <Item label="Member Circles" value="memberCircles"/>
                            </Picker>
                        </Form>
                    <View style={{width, height}}>
                        <MapView style={{...StyleSheet.absoluteFillObject}}
                        region={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: this.state.longitudeDelta,
                            longitudeDelta: this.state.latitudeDelta,
                        }}>
                            <MapView.Marker 
                            title="You are here"
                            pinColor='blue'
                            coordinate={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude
                            }}
                            />
                            {this.renderMembers()}
                        </MapView>
                    </View>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button onPress={() => this.props.getInvitations(this.props.user)}>
                            <Text>Invitations</Text>
                        </Button> 
                        {this.footer()}
                        <Button onPress={() => this.addCircle()}>
                            <Text>Create Circle</Text>
                        </Button> 
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.AuthReducer.user,
        isLogedIn: state.AuthReducer.isLogin,
        currentLocation: state.MapReducer.userLocation,
        createdCircles: state.MapReducer.createdCircles,
        memberCircles: state.MapReducer.memberCircles,
        circleMembers: state.MapReducer.circleMembers
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        logOut: () => {
            dispatch({type: 'LOGOUT'})
        },
        userLocation: (location) => {
            dispatch(MapMiddleware.userLocation(location))
        },
        newCircle: () => {
            dispatch({type: 'NEW_CIRCLE'})
        },
        getCircles: (user, location) => {
            dispatch(MapMiddleware.getCircles(user, location))
        },
        invite: (selectedCircle) => {
            dispatch({type: 'INVITE', payload: selectedCircle})
        },
        getInvitations: (user) => {
            dispatch(MapMiddleware.getInvitations(user))
        },
        getMembers: (circle) => {
            dispatch(MapMiddleware.getCircleMembers(circle))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Map);