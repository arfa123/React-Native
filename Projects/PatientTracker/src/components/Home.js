import React, {Component} from 'react';
import {View, Text, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {Button,Card,CardSection,Header,Heading,Input,Link} from './common';
import {AuthService} from '../store/middleware/authMiddleware';
import {firebaseApp} from '../Firebase';
import {logoutSuccess,logoutReject} from '../store/action/authAction';

class Home extends Component {
    componentDidMount(){
        this.onAuthComplete(this.props)
    }
    componentWillReceiveProps(nextProps){
        this.onAuthComplete(nextProps)
    }
    onAuthComplete(props){
        if(props.login === false){
            this.props.navigation.navigate('login');
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
        this.props.navigation.navigate('findpatient')
    }
    addPatient(){
        this.props.navigation.navigate('addpatient')
    }
    render(){
        const {navigate} = this.props.navigation;
        return(
            <View>
                <Card>
                    <Heading headingText="Home"/>
                    <CardSection>
                        <Button onPress={() => this.logout()}>Logout</Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={() => this.trackPatient()}>Track Patient</Button>
                    </CardSection>
                    <CardSection>
                        <Button onPress={() => this.addPatient()}>Add New Patient</Button>
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