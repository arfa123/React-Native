import React, {Component} from 'react';
import {View, Modal, DatePickerAndroid, TimePickerAndroid, TouchableOpacity, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Card, Button, FormLabel, FormInput} from 'react-native-elements';
import {CardSection} from './common';

class SetAppointment extends Component{
    constructor(props){
        super(props)
        this.state = {
            appointmentDate: this.props.selectedPatient.appointmentDate,
            appointmentTime: this.props.selectedPatient.appointmentTime,
        }
    }
    async setAppointmentDate(){
        try {
            let {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date()
            });
            if(action === DatePickerAndroid.dateSetAction){
                month = month + 1;
                this.setState({appointmentDate: day+'/'+month+'/'+year})
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }
    async setAppointmentTime(){
        try {
            let {action, hour, minute} = await TimePickerAndroid.open({
                is24Hour: false
            });
            if (action === TimePickerAndroid.timeSetAction) {
                let midday = undefined
                console.log("time:",hour, minute)
                if(hour > 12){
                    hour = hour - 12
                    midday = 'PM'
                }
                else if(hour == 0){
                    hour = 12
                    midday = 'AM'
                }
                else if(hour == 12){
                    hour = 12
                    midday = 'PM'
                }
                else if(hour < 12){
                    midday = 'AM'
                }
                this.setState({
                    appointmentTime: hour+':'+minute+' '+midday
                })
            }
        } catch ({code, message}) {
            console.warn('Cannot open time picker', message);
        }
    }
    save(){
        let patient = {
            patientName: this.props.selectedPatient.patientName,
            age: this.props.selectedPatient.age,
            arrivalDate: this.props.selectedPatient.arrivalDate,
            disease: this.props.selectedPatient.disease,
            medication: this.props.selectedPatient.medication,
            appointmentDate: this.state.appointmentDate,
            appointmentTime: this.state.appointmentTime,
            contactNo: this.props.selectedPatient.contactNo,
            _id: this.props.selectedPatient._id,
            userID: this.props.userID
        }
        console.log("save:",patient)
        this.props.appointmentSet(patient)
        this.props.modal(false)
    }
    render(){
        return(
            <Modal 
            animationType="slide"
            visible={this.props.modalVisible}
            transparent={true}
            onRequestClose={() => this.props.modal(false)}>
                <View style={{position:'absolute', top:0, bottom:0, right:0, left:0, backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <ScrollView>
                <Card
                title="Set Appointment"
                titleStyle={{fontSize:30}}
                wrapperStyle={{backgroundColor: '#ffffff'}}
                containerStyle={{marginTop:80, borderWidth: 2, borderColor: '#000000', borderRadius:5}}>
                    <FormLabel labelStyle={{fontSize: 15, color: 'red'}}>
                        Set Date:
                    </FormLabel>
                    <FormInput
                    inputStyle={{fontSize: 20, color: '#000000'}}
                    value={this.state.appointmentDate}
                    onChangeText={(appointmentDate) => this.setState({appointmentDate})}
                    onFocus={() => this.setAppointmentDate()}
                    />
                    <FormLabel labelStyle={{fontSize: 15, color: 'red'}}>
                        Set Time:
                    </FormLabel>
                    <FormInput
                    inputStyle={{fontSize: 20, color: '#000000'}}
                    value={this.state.appointmentTime}
                    onChangeText={(appointmentTime) => this.setState({appointmentTime})}
                    onFocus={() => this.setAppointmentTime()}
                    />
                    <CardSection>
                    <Button 
                        Component={TouchableOpacity}
                        title="Save"
                        onPress={() => this.save()}
                        color="#ffffff"
                        fontSize= {24}
                        fontWeight="bold"
                        backgroundColor="blue"
                        containerViewStyle={{
                            alignSelf: 'center', 
                            flex: 1,
                            borderRadius: 2,
                            borderWidth: 2,
                            borderColor: 'blue',
                            margin: 5}}
                    />
                    </CardSection>
                </Card>
                </ScrollView>
                </View>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedPatient: state.PatientReducer.selectedPatient,
        userID: state.AuthenticationReducer.user._id
    }
}

export default connect(mapStateToProps)(SetAppointment);