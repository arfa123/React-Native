import React, {Component} from 'react';
import {View, Text, DatePickerAndroid, TimePickerAndroid, TouchableOpacity, ScrollView, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {Card, Button, Header} from 'react-native-elements';
import {CardSection, Input} from './common';
import {PatientMiddleware} from '../store/middleware/patientMiddleware';

class AddPatient extends Component{
    constructor(props){
        super(props)
        this.state={
            name:'',
            age:'',
            arrivalDate:'',
            disease:'',
            medication:'',
            appointmentDate:'',
            appointmentTime: '',
            contactNo: ''
        }
    }
    componentDidMount(){
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
    componentDidUpdate(){
        if(this.props.patientAdded){
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
        }
    }
    
    addPatient(){
        if(this.state.name&&this.state.age&&this.state.arrivalDate&&this.state.disease&&this.state.medication&&this.state.contactNo !== ''){
            let patient = {
                name: this.state.name,
                age: this.state.age,
                arrivalDate: this.state.arrivalDate,
                disease: this.state.disease,
                medication: this.state.medication,
                appointment: {
                    date: this.state.appointmentDate,
                    time: this.state.appointmentTime
                },
                contactNo: this.state.contactNo
            }
            this.props.addPatient(patient)
        }
        else{
            alert("Please fill all input fields")
        }
    }
    async setArrivalDate(){
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({           
                date: new Date()
            });
            if(action == DatePickerAndroid.dateSetAction){
                month = month + 1
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
                month = month + 1
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
    render(){
        return(
            <View>
                <ScrollView>
                <Header 
                backgroundColor="blue"
                centerComponent={{ text: 'PATIENT TRACKER', style: { color: '#fff' ,fontSize: 30, fontWeight: 'bold'} }} 
                 />
                <Card 
                title="Add New Patient"
                titleStyle={{fontSize:30}}
                wrapperStyle={{backgroundColor: '#ffffff'}}
                containerStyle={{marginTop: 80, marginBottom: 5, borderWidth: 2, borderColor: 'green', borderRadius:5}}>
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
                        label="Contact #:"
                        valuw={this.state.contactNo}
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
                        title="Add Patient"
                        onPress={() => this.addPatient()}
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
        patientAdded: state.PatientReducer.patientAdded
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addPatient: (patient) => {
            dispatch(PatientMiddleware.addNewPatient(patient))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddPatient);