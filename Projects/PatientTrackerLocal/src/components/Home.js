import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Card, Button} from 'react-native-elements';
import {CardSection,Header,Input,Link} from './common';
import {AuthService} from '../store/middleware/authMiddleware';

class Home extends Component {
    trackPatient(){
        this.props.navigation.navigate('findpatient')
    }
    addPatient(){
        this.props.newPatient
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