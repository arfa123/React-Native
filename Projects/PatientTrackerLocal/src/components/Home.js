import React, {Component} from 'react';
import {View, Text, TouchableOpacity, BackHandler, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {Card, Button, Header} from 'react-native-elements';
import {CardSection} from './common';
import {AuthService} from '../store/middleware/authMiddleware';

class Home extends Component {
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp()
            return true
        })
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress')
    }
    trackPatient(){
        this.props.navigation.dispatch(
            NavigationActions.navigate({
                routeName: 'findpatient'
            })
        )
    }
    addPatient(){
        this.props.newPatient
        this.props.navigation.dispatch(
            NavigationActions.navigate({
                routeName: 'addpatient'
            })
        )
    }
    deleteAccount(){
        AsyncStorage.setItem('userRegistered', JSON.stringify({userReg: false}))
        .then(() => {
            this.props.navigation.dispatch(
                NavigationActions.navigate({
                    routeName: 'signup'
                })
            )
        })
    }
    render(){
        return(
            <View>
                <Header 
                backgroundColor="blue"
                centerComponent={{ text: 'PATIENT TRACKER LOCAL', style: { color: '#fff' ,fontSize: 25, fontWeight: 'bold'} }} 
                 />
                <Card
                title="Home"
                titleStyle={{fontSize:30}}
                wrapperStyle={{backgroundColor: '#ffffff'}}
                containerStyle={{marginTop: 80, borderWidth: 2, borderColor: 'green', borderRadius:5}}>
                    <CardSection>
                        <Button 
                        Component={TouchableOpacity}
                        title="Track Patient"
                        color="#ffffff"
                        fontSize= {24}
                        fontWeight="bold"
                        backgroundColor="green"
                        containerViewStyle={{
                            backgroundColor:'#ffffff',
                            alignSelf: 'stretch', 
                            flex: 1,
                            borderRadius: 2,
                            borderWidth: 2,
                            borderColor: 'green',
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
                        backgroundColor="green"
                        containerViewStyle={{
                            backgroundColor:'#ffffff',
                            alignSelf: 'stretch', 
                            flex: 1,
                            borderRadius: 2,
                            borderWidth: 2,
                            borderColor: 'green',
                            margin: 5}}
                        onPress={() => this.addPatient()}
                        />
                    </CardSection>
                    <CardSection>
                        <Button 
                        Component={TouchableOpacity}
                        title="Delete Account"
                        color="#ffffff"
                        fontSize= {24}
                        fontWeight="bold"
                        backgroundColor="green"
                        containerViewStyle={{
                            backgroundColor:'#ffffff',
                            alignSelf: 'stretch', 
                            flex: 1,
                            borderRadius: 2,
                            borderWidth: 2,
                            borderColor: 'green',
                            margin: 5}}
                        onPress={() => this.deleteAccount()}
                        />
                    </CardSection>
                </Card>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.AuthenticationReducer.user
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        newPatient: dispatch({type: 'NEW_PATIENT'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);