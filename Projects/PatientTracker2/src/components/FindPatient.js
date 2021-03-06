import React, {Component} from 'react';
import {Alert, View, Text, Picker, ScrollView, DatePickerAndroid, StyleSheet, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {Card, Tab, Tabs, Button, Header, Icon} from 'react-native-elements';
import {CardSection, Input, Spinner} from './common';
import {PatientMiddleware} from '../store/middleware/patientMiddleware';
import PatientList from './PatientList';
import SetAppointment from './SetAppointment';

class FindPatient extends Component {
    constructor(props){
        super(props)
        this.state = {
            findPatientBy: '',
            search: '',
            modalVisible: false
        }
    }
    componentDidMount(){
        this.props.getPatient(this.props.userID)
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.dispatch(
                NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({
                            routeName: 'home'
                        })
                    ]
                })
            )
            return true
        })
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress')
    }
    trackPatientInput(){
        if(this.state.findPatientBy === 'name'){
            return(
                <Input 
                placeholder="Enter Patient Name"
                onChangeText={(search) => this.setState({search})}
                value={this.state.search}
                onFocus={() => {this.props.unselect()}}
                />
            )
        }
        if(this.state.findPatientBy === 'date'){
            return(
                <Input 
                placeholder="Enter Patient Appointment Date"
                onChangeText={(search) => this.setState({search})}
                value={this.state.search}
                onFocus={() => this.setAppointment()}
                />
            )
        }
    }
    async setAppointment(){
        this.props.unselect()
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date()
            });
            if(action === DatePickerAndroid.dateSetAction){
                month = month + 1;
                this.setState({search: day+'/'+month+'/'+year})
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }
    showTabBar(){
        if(this.props.selectedPatient !== undefined){
            return(
                <Tabs tabBarStyle={{backgroundColor: '#ffffff', position: 'absolute', bottom: 0, borderTopWidth: 2, borderTopColor: 'gray'}}>
                    <Tab 
                    title='Set Appointment'
                    titleStyle={{color:'red', fontSize:10}}
                    renderIcon={() => <Icon name='perm-contact-calendar' color={'blue'} size={30} />}
                    onPress={() => this.setState({modalVisible: true})}>
                    </Tab>
                    <Tab 
                    title='Edit'
                    titleStyle={{color:'red', fontSize:10}}
                    renderIcon={() => <Icon name='edit' color={'blue'} size={30} />}
                    onPress={() => this.editPatient()}>
                    </Tab>
                    <Tab 
                    title='Delete'
                    titleStyle={{color:'red', fontSize: 10}}
                    renderIcon={() => <Icon name='delete' color={'blue'} size={30} />}
                    onPress={() => this.deletePatient()}>
                    </Tab>
                </Tabs>
            )
        }
    }
    visibleTabBar(id){
        if(id === undefined){
            this.props.unselect()
        }
        else{
            let ID = {
                userID: this.props.userID,
                patientID: id
            }
            this.props.selectedPatientID(ID)
        }
    }
    editPatient(){
        this.props.editPatient()
        this.props.navigation.dispatch(
            NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'patientDetails'
                    })
                ]
            })
        )
    }
    deletePatient(){
        let ID = {
            userID: this.props.userID,
            patientID: this.props.selectedPatient._id
        }
        Alert.alert(
            'Delete Patient',
            'Are you sure to delete the selected Patient?',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress: () => this.props.deletePatient(ID)},
            ],
            { cancelable: false }
        )
    }
    modal(visible){
        this.setState({
            modalVisible: visible
        })
    }
    showModal(){
        if(this.state.modalVisible){
            return(
                <SetAppointment 
                modalVisible={this.state.modalVisible}
                modal={(visible) => this.modal(visible)}
                appointmentSet={(patient) => this.appointmentSet(patient)}
                />
            )
        }
    }
    appointmentSet(patient){
        this.props.savePatient(patient)
    }
    render(){
        return(
            <View>
                <ScrollView>
                <Header 
                backgroundColor="blue"
                centerComponent={{ text: 'PATIENT TRACKER 2', style: { color: '#fff' ,fontSize: 30, fontWeight: 'bold'} }} 
                 />
                <View>
                <Card 
                title="Track Patient"
                titleStyle={{fontSize:30}}
                wrapperStyle={{backgroundColor: '#ffffff'}}
                containerStyle={{marginTop: 80, marginBottom: 60, borderWidth: 2, borderColor: 'green', borderRadius:5}}>
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
                {this.showModal()}
                </View>
                </ScrollView>
                {this.showTabBar()}
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userID: state.AuthenticationReducer.user._id,
        selectedPatient: state.PatientReducer.selectedPatient
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
        selectedPatientID: (id) => {
            dispatch(PatientMiddleware.patientSelected(id))
        },
        editPatient: () => {
            dispatch({type: 'EDIT_PATIENT'})
        },
        unselect: () => {
            dispatch({type: 'PATIENT_SELECTED', payload: undefined})
        },
        savePatient: (patient) => {
            dispatch(PatientMiddleware.savePatient(patient))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindPatient);