import React, {Component} from 'react';
import {View, Text, Picker, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Card, Tab, Tabs} from 'react-native-elements';
import {CardSection, Input, Spinner} from './common';
import {PatientMiddleware} from '../store/middleware/patientMiddleware';
import PatientList from './PatientList';

class FindPatient extends Component {
    constructor(props){
        super(props)
        this.state = {
            findPatientBy: '',
            search: '',
            showTabBar: false,
            patientID: undefined
        }
    }
    componentWillMount(){
        console.log('componentWillMount')
        
    }
    componentDidMount(){
        console.log('componentDidMount',this.props.userID)
        this.props.getPatient(this.props.userID)
    }

    trackPatientInput(){
        if(this.state.findPatientBy === 'name'){
            return(
                <Input 
                placeholder="Enter Patient Name"
                onChangeText={(search) => this.setState({search})}
                labelStyle={{flex: 0}}
                textStyle={{flex:1}}
                onFocus={() => this.setState({showTabBar: false, patientID: false})}
                />
            )
        }
        if(this.state.findPatientBy === 'date'){
            return(
                <Input 
                placeholder="Enter Patient Appointment Date"
                onChangeText={(search) => this.setState({search})}
                labelStyle={{flex: 0}}
                textStyle={{flex:1}}
                onFocus={() => this.setState({showTabBar: false, patientID: false})}
                />
            )
        }
    }
    editPatient(){
        this.props.editPatient()
        this.props.navigation.navigate('patientDetails')
    }
    showTabBar(){
        if(this.state.showTabBar){
            return(
                <Tabs tabBarStyle={{backgroundColor: 'red', position: 'absolute', marginBottom: 0}}>
                    <Tab 
                    title='Delete'
                    titleStyle={{color:'#ffffff', fontWeight: 'bold', fontSize: 20}}
                    selectedTitleStyle={{fontSize: 25, color: '#000000'}}
                    onPress={() => this.deletePatient()}>
                    </Tab>
                </Tabs>
            )
        }
    }
    visibleTabBar(id){
        this.setState({
            showTabBar: true,
            patientID: id
        })
    }
    deletePatient(){
        let ID = {
            userID: this.props.userID,
            patientID: this.state.patientID
        }
        this.props.deletePatient(ID)
    }
    render(){
        const {navigate} = this.props.navigation;
        return(
            <View>
                <ScrollView>
                <Card 
                title="Track Patient"
                titleStyle={{fontSize:30}}
                wrapperStyle={{backgroundColor: '#ffffff'}}
                containerStyle={{marginBottom: 60, borderWidth: 2, borderColor: 'green', borderRadius:5}}>
                    <CardSection>
                        {this.trackPatientInput()}
                    </CardSection>
                    <CardSection>
                        <Text style={{color: 'red', paddingTop: 10, fontSize:18}}>Track Patient By:</Text>
                        <Picker 
                        style={{width: '100%'}}
                        selectedValue={this.state.findPatientBy}
                        onValueChange={(value) => {this.setState({findPatientBy: value})}}
                        mode="dropdown">
                            <Picker.Item label="Show All" value="showAll"/>
                            <Picker.Item label="Name" value="name"/>
                            <Picker.Item label="Appointment Date" value="date"/>
                        </Picker>
                    </CardSection>
                    <PatientList 
                    visibleTabBar={(id) => this.visibleTabBar(id)} 
                    search={this.state.search} 
                    findPatientBy={this.state.findPatientBy}
                    />
                </Card>
                </ScrollView>
                {this.showTabBar()}
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userID: state.AuthenticationReducer.user._id
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getPatient: (userID) => {
            dispatch(PatientMiddleware.getPatient(userID))
        },
        deletePatient: (id) => {
            dispatch(PatientMiddleware.deletePatient(id))
        },
        editPatient: () => {
            dispatch({type: 'EDIT_PATIENT'})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindPatient);