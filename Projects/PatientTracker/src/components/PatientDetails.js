import React, {Component} from 'react';
import {View, Text, DatePickerAndroid, TimePickerAndroid, ScrollView, TouchableOpacity, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {Card, Button} from 'react-native-elements';
import {CardSection, Input} from './common';
import {PatientMiddleware} from '../store/middleware/patientMiddleware';

class PatientDetails extends Component{
    constructor(props){
        super(props)
        this.state={
            name: this.props.selectedPatient.name,
            age: this.props.selectedPatient.age,
            arrivalDate: this.props.selectedPatient.arrivalDate,
            disease: this.props.selectedPatient.disease,
            medication: this.props.selectedPatient.medication,
            appointmentDate: this.props.selectedPatient.appointmentDate,
            appointmentTime: this.props.selectedPatient.appointment.time,
            contactNo: this.props.selectedPatient.contactNo
        }
    }
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.dispatch(
                NavigationActions.navigate({
                    routeName: 'patient'
                })
            )
            return true
        })
    }
    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress')
    }
    componentDidUpdate(){
        console.log("compDidUp:",this.props.selectedPatient)
        if(this.props.patientSaved){
            this.props.navigation.dispatch(
                NavigationActions.navigate({
                    routeName: 'patient'
                })
            )
        }
    }
    savePatient(){
        let patient = {
            name: this.state.name,
            age: this.state.age,
            arrivalDate: this.state.arrivalDate,
            disease: this.state.disease,
            medication: this.state.medication,
            appointmentDate: this.state.appointmentDate,
            contactNo: this.state.contactNo,
            appointment: {
                date: this.state.appointmentDate,
                time: this.state.appointmentTime
            },
            id: this.props.selectedPatient.id
        }
        this.props.savePatient(patient)
    }
    async setArrivalDate(){
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({           
                date: new Date()
            });
            if(action == DatePickerAndroid.dateSetAction){
                month = month + 1;
                this.setState({arrivalDate: day+'/'+month+'/'+year})
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }   
    }
    async setAppointment(){
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
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
    cancel(){
        this.props.navigation.dispatch(
            NavigationActions.navigate({
                routeName: 'patient'
            })
        )
    }
    render(){
        return(
            <View>
                <ScrollView>
                <Card 
                title="Edit Patient"
                titleStyle={{fontSize:30}}
                wrapperStyle={{backgroundColor: '#ffffff'}}
                containerStyle={{marginBottom: 5, borderWidth: 2, borderColor: 'green', borderRadius:5}}>
                    <CardSection>
                        <Input 
                        label="Patient Name:"
                        value={this.state.name}
                        onChangeText={(name) => this.setState({name})}
                        />
                    </CardSection>
                    <CardSection>
                        <Input 
                        label="Patient Age:"
                        value={this.state.age}
                        onChangeText={(age) => this.setState({age})}
                        />
                    </CardSection>
                    <CardSection>
                        <Input 
                        label="Date of Arrival:"
                        value={this.state.arrivalDate}
                        onFocus={() => this.setArrivalDate()}
                        onChangeText={(arrivalDate) => this.setState({arrivalDate})}
                        />
                    </CardSection>
                    <CardSection>
                        <Input 
                        label="Diseases:"
                        value={this.state.disease}
                        onChangeText={(disease) => this.setState({disease})}
                        />
                    </CardSection>
                    <CardSection>
                        <Input 
                        label="Medications:"
                        value={this.state.medication}
                        onChangeText={(medication) => this.setState({medication})}
                        />
                    </CardSection>
                    <CardSection>
                        <Input 
                        label="Contact Number:"
                        value={this.state.contactNo}
                        onChangeText={(contactNo) => this.setState({contactNo})}
                        />
                    </CardSection>
                    <Card
                    title="Set Appointment"
                    titleStyle={{fontSize:25}}
                    wrapperStyle={{backgroundColor: '#ffffff'}}
                    containerStyle={{borderWidth: 2, borderColor: 'red', borderRadius:5}}>
                        <CardSection>
                            <Input 
                            label="Date:"
                            placeholder="DD/MM/YY"
                            onFocus={() => this.setAppointment()}
                            value={this.state.appointmentDate}
                            onChangeText={(appointmentDate) => this.setState({appointmentDate})}
                            />
                        </CardSection>
                        <CardSection>
                            <Input 
                            label="Time:"
                            placeholder="HH:MM AM/PM"
                            onFocus={() => this.setAppointmentTime()}
                            value={this.state.appointmentTime}
                            onChangeText={(appointmentTime) => this.setState({appointmentTime})}
                            />
                        </CardSection>
                    </Card>
                    <CardSection>
                        <Button 
                        Component={TouchableOpacity}
                        title="Save"
                        onPress={() => this.savePatient()}
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
                        <Button 
                        Component={TouchableOpacity}
                        title="Cancel"
                        onPress={() => this.cancel()}
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
                </Card>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedPatient: state.PatientReducer.selectedPatient,
        patientSaved: state.PatientReducer.patientSaved
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        savePatient: (patient) => {
            dispatch(PatientMiddleware.savePatient(patient))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PatientDetails);