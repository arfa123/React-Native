import React, {Component} from 'react';
import {View,Text,TouchableOpacity,DatePickerAndroid,TimePickerAndroid,
    ScrollView,AsyncStorage,BackHandler} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {Card, Button} from 'react-native-elements';
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
            appointmentTime:'',
            contactNo: ''
        }
    }
    componentDidMount(){
        this.onPatientAdded(this.props)
        BackHandler.addEventListener('hardwareBackPress', () => {
            this.props.navigation.dispatch(
                NavigationActions.reset({
                    index:0,
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
    componentWillReceiveProps(nextProps){
        this.onPatientAdded(nextProps)
    }
    onPatientAdded(props){
        if(props.patientAdded){
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
            AsyncStorage.getItem('id')
            .then((id) => {
                let idx = parseInt(id)
                console.log("lol",idx)
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
                    contactNo: this.state.contactNo,
                    id: idx
                }
                idx = idx+1
                idx = idx.toString()
                AsyncStorage.setItem('id',idx)
                .then(() => {
                    AsyncStorage.getItem('id')
                    .then((id) => {
                        this.props.addPatient(patient)
                    })
                })
            })
        }
        else{
            alert("Please Fill all input fields!")
        }
    }
    async setArrivalDate(){
        try {
            let {action, year, month, day} = await DatePickerAndroid.open({           
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
            let {action, year, month, day} = await DatePickerAndroid.open({
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
                <Card
                title="Add Patient"
                titleStyle={{fontSize:30}}
                wrapperStyle={{backgroundColor: '#ffffff'}}
                containerStyle={{borderWidth: 2, borderColor: 'green', borderRadius:5, marginBottom: 10}}>
                    <CardSection>
                        <Input 
                        label="Patient Name:"
                        placeholder="Enter Patient Name"
                        value={this.state.name}
                        onChangeText={(name) => this.setState({name})}
                        autoCapitalize="sentences"
                        />
                    </CardSection>
                    <CardSection>
                        <Input 
                        label="Patient Age:"
                        placeholder="Enter Patient Age"
                        value={this.state.age}
                        onChangeText={(age) => this.setState({age})}
                        />
                    </CardSection>
                    <CardSection>
                        <Input 
                        label="Date of Arrival:"
                        placeholder="DD/MM/YY"
                        onFocus={() => this.setArrivalDate()}
                        value={this.state.arrivalDate}
                        onChangeText={(arrivalDate) => this.setState({arrivalDate})}
                        />
                    </CardSection>
                    <CardSection>
                        <Input 
                        label="Disease:"
                        placeholder="Enter Diseases"
                        value={this.state.disease}
                        onChangeText={(disease) => this.setState({disease})}
                        />
                    </CardSection>
                    <CardSection>
                        <Input 
                        label="Medication:"
                        placeholder="Enter Medications"
                        value={this.state.medication}
                        onChangeText={(medication) => this.setState({medication})}
                        />
                    </CardSection>
                    <CardSection>
                        <Input 
                        label="Contact #:"
                        placeholder="Enter Contact Number"
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