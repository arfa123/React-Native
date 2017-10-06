import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import {connect} from 'react-redux';
import {H2, H3, FooterTab, Icon, CardItem, Text, Container, Header, Title, Content, Footer, Item, Left, Right, Input, Label, Body, Badge, Button, Form, Card, Spinner} from 'native-base';
import {AuthService} from '../store/middleware/authMiddleware';
import {MapMiddleware} from '../store/middleware/mapMiddleware';
import {firebaseApp} from '../Firebase';
import {logoutSuccess, logoutReject} from '../store/action/authAction';

const { width, height } = Dimensions.get('window');
const ratio = width / height;
class Map extends Component{
    constructor(props){
        super(props)
        this.state = {
            latitude: this.props.currentLocation.latitude,
            longitude: this.props.currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0922 * ratio,
            error: null
        }
    }
    componentWillMount(){
        navigator.geolocation.getCurrentPosition((position) => {
            console.log("posi:",position)
            this.props.userLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null
            })
            this.setState({
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
            this.props.userLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                error: null
            })
        },(error) => {
            console.log("error:",error)
            this.setState({error: error})
        })
    }
    componentDidMount(){
        
    }
    componentWillUnmount(){
        navigator.geolocation.clearWatch()
    }
    componentDidUpdate(){
        if(this.props.isLogedIn !== true){
            this.props.navigation.navigate('login')
        }
    }
    signout(){
        firebaseApp.auth().signOut()
        .then(() => {
            this.props.signout()
        })
        .catch((error) => {
            this.props.signoutFailed(error)
        })
    }
    find(){
        this.props.getPlaces({
            latitude: this.props.currentLocation.latitude,
            longitude: this.props.currentLocation.longitude
        })
    }
    placeSelected(place){
        console.log("place:",place)
        this.props.placeSelected(place)
        this.setState({
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng
        })
    }
    showFooter(){
        if(this.props.selectedPlace !== undefined){
            if(this.props.directions === undefined){
                return(
                    <Footer>
                        <FooterTab>
                            <Button onPress={() => this.myLocation()}>
                                <Text style={{color: '#ffffff', fontSize: 20, fontWeight: 'bold'}}>My Location</Text>
                            </Button>
                            <Button onPress={() => this.getDirections()}>
                                <Text style={{color: '#ffffff', fontSize: 20, fontWeight: 'bold'}}>Get Directions</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                    )
            }
            else{
                return(
                    <Footer>
                        <FooterTab>
                            <Button style={{backgroundColor: '#ffffff'}}>
                                <Text style={{color: 'red', margin: 5}}>Distance: {this.props.distance}</Text>
                                <Text style={{color: 'red', margin: 5}}>Duration: {this.props.duration}</Text> 
                            </Button>
                            <Button onPress={() => this.myLocation()}>
                                <Text style={{color: '#ffffff', fontSize: 15, fontWeight: 'bold'}}>My Location</Text>
                            </Button>
                            <Button onPress={() => this.props.clearDirections()}>
                                <Text style={{color: '#ffffff', fontSize: 15, fontWeight: 'bold'}}>Clear Directions</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                )
            }
        }
        else{
            return(
                <Footer>
                    <FooterTab>
                        <Button onPress={() => this.find()}>
                            <Text style={{color: '#ffffff', fontSize: 20, fontWeight: 'bold'}}>Find Places</Text>
                        </Button>
                        <Button onPress={() => this.myLocation()}>
                            <Text style={{color: '#ffffff', fontSize: 20, fontWeight: 'bold'}}>Go To My Location</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            )
        }
    }
    myLocation(){
        this.setState({
            latitude: this.props.currentLocation.latitude,
            longitude: this.props.currentLocation.longitude
        })
    }
    getDirections(){
        console.log("pop:",this.props.currentLocation,this.props.selectedPlace.geometry.location)
        this.props.getDirections(
            `${this.props.currentLocation.latitude},${this.props.currentLocation.longitude}`,
            `${this.props.selectedPlace.geometry.location.lat},${this.props.selectedPlace.geometry.location.lng}`
        )
    }
    showDirections(){
        if(this.props.directions !== undefined){
            return(
                <MapView.Polyline coordinates={this.props.directions}
                strokeWidth={2}
                strokeColor="red"/>
            )
        }
    }
    render(){
        const { width, height } = Dimensions.get('window');
        const {navigate} = this.props.navigation;
        return(
            <Container>
                <Header>
                    <Left style={{flex:0.5}}/>
                    <Body style={{alignItems:'center', flex: 4}}>
                        <Title style={{fontSize: 35, fontWeight: 'bold'}}>TOURIST GUIDE</Title>
                    </Body>
                    <Right style={{flex: 1.5}}>
                        <Button small danger onPress={() => this.signout()}>
                            <Text style={{fontSize: 15}}>Logout</Text>
                        </Button>
                    </Right>
                </Header>
                <Content scrollEnabled={false}>
                    <View style={{height, width}}>
                        <MapView style={{...StyleSheet.absoluteFillObject}}
                        loadingEnabled={true}
                        onMarkerPress={() => console.log("onMarkerPress of Map")}
                        region={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: this.state.longitudeDelta,
                            longitudeDelta: this.state.latitudeDelta,
                        }}
                        onPress={(e) => this.props.unselectPlace()}>
                            <MapView.Marker 
                            title="You are here"
                            pinColor='blue'
                            coordinate={{
                                latitude: this.props.currentLocation.latitude,
                                longitude: this.props.currentLocation.longitude
                            }}
                            />
                            {this.showDirections()}
                            {this.props.nearPlaces.map((x,y) => {
                                return(
                                    <MapView.Marker 
                                    key={y}
                                    onPress={(e) => {this.placeSelected(x)}}
                                    title={x.name}
                                    coordinate={{
                                        latitude: x.geometry.location.lat,
                                        longitude: x.geometry.location.lng
                                    }}
                                    />
                                )
                            })}
                        </MapView>
                    </View>
                </Content>
                    {this.showFooter()}
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.AuthReducer.user,
        currentLocation: state.MapReducer.userLocation,
        error: state.AuthReducer.errorMessage,
        isLogedIn: state.AuthReducer.isLogin,
        nearPlaces: state.MapReducer.nearPlaces,
        selectedPlace: state.MapReducer.selectedPlace,
        directions: state.MapReducer.directions,
        distance: state.MapReducer.legs.distance,
        duration: state.MapReducer.legs.duration
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        signout: () => {
            return dispatch(logoutSuccess)
        },
        signoutFailed: (error) => {
            return dispatch(logoutReject(error))
        },
        userLocation: (location) => {
            return dispatch(MapMiddleware.userLocation(location))
        },
        getPlaces: (location) => {
            return dispatch(MapMiddleware.getPlaces(location))
        },
        placeSelected: (place) => {
            return dispatch(MapMiddleware.placeSelected(place))
        },
        unselectPlace: () => {
            return dispatch({type: 'UNSELECT_PLACE'})
        },
        getDirections: (startLoc,destLoc) => {
            return dispatch(MapMiddleware.getDirections(startLoc,destLoc))
        },
        clearDirections: () => {
            return dispatch({type: 'CLEAR_DIRECTIONS'})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);