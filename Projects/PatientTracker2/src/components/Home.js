import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Button, Card} from 'react-native-elements';
import {CardSection, Input} from './common';
import {AuthService} from '../store/middleware/authMiddleware';
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
        this.props.signout()
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
                <Card
                title="Home"
                titleStyle={{fontSize:30}}
                wrapperStyle={{backgroundColor: '#ffffff'}}
                containerStyle={{borderWidth: 2, borderColor: 'green', borderRadius:5}}>
                    <CardSection>
                        <Button 
                        Component={TouchableOpacity}
                        title="Logout"
                        onPress={() => this.logout()}
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
                        />
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
            return dispatch({type: 'LOGOUT'})
        },
        addNewPatient: () => {
            return dispatch({type: 'NEW_PATIENT'})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);