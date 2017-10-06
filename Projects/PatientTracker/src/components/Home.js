import React, {Component} from 'react';
import {View, Text, TouchableOpacity, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {Card, Button, Header} from 'react-native-elements';
import {CardSection} from './common';
import {AuthService} from '../store/middleware/authMiddleware';
import {firebaseApp} from '../Firebase';
import {logoutSuccess,logoutReject} from '../store/action/authAction';

class Home extends Component {
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.logout()
            return true
        })
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress')
    }
    componentDidUpdate(){
        if(this.props.login === false){
            this.props.navigation.dispatch(
                NavigationActions.navigate({
                    routeName: 'login'
                })
            )
        }
    }
    logout(){
        firebaseApp.auth().signOut()
        .then(() => {
            this.props.signout()
        })
        .catch((error) => {
            this.props.signoutFailed(error)
        })
    }
    trackPatient(){
        this.props.navigation.dispatch(
            NavigationActions.navigate({
                routeName: 'findpatient'
            })
        )
    }
    addPatient(){
        this.props.navigation.dispatch(
            NavigationActions.navigate({
                routeName: 'addpatient'
            })
        )
    }
    render(){
        return(
            <View>
                <Header 
                backgroundColor="blue"
                centerComponent={{ text: 'PATIENT TRACKER', style: { color: '#fff' ,fontSize: 30, fontWeight: 'bold'} }} 
                 />
                <Card
                title="Home"
                titleStyle={{fontSize:30}}
                wrapperStyle={{backgroundColor: '#ffffff'}}
                containerStyle={{borderWidth: 2, borderColor: 'green', borderRadius:5, marginTop: 80}}>
                    <CardSection>
                        <Text style={{color: 'red', fontSize: 15}}>Mr. {this.props.user.name}, Welcome to the Patient Tracker App</Text>
                    </CardSection>
                    <CardSection>
                        <Button 
                        Component={TouchableOpacity}
                        title="Track Patient"
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
                        onPress={() => this.trackPatient()}
                        />
                    </CardSection>
                    <CardSection>
                        <Button 
                        Component={TouchableOpacity}
                        title="Add New Patient"
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
                        onPress={() => this.addPatient()}
                        />
                    </CardSection>
                    <CardSection>
                        <Button 
                        Component={TouchableOpacity}
                        title="Logout"
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
                        onPress={() => this.logout()}
                        />
                    </CardSection>
                </Card>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.AuthenticationReducer.user,
        login: state.AuthenticationReducer.isLogin
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        signout: () => {
            return dispatch(logoutSuccess)
        },
        signoutFailed: (error) => {
            return dispatch(logoutReject(error))
        },
        addNewPatient: () => {
            return dispatch({type: 'NEW_PATIENT'})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);