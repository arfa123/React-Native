import React, {Component} from 'react';
import {View, Text, TouchableOpacity, DatePickerAndroid, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Card, Button} from 'react-native-elements';
import {CardSection, Input} from './common';
import {PatientMiddleware} from '../store/middleware/patientMiddleware';

class AddPatient extends Component{
    constructor(props){
        super(props)
        this.state={
            name:'',
            arrivalDate:'',
            disease:'',
            medication:'',
            appointmentDate:'',
            contactNo: ''
        }
    }
    componentDidMount(){
        this.onPatientAdded(this.props)
    }
    componentWillReceiveProps(nextProps){
        this.onPatientAdded(nextProps)
    }
    onPatientAdded(props){
        if(props.patientAdded){
            this.props.navigation.navigate('home')
        }
    }
    addPatient(){
        let patient = {
            name: this.state.name,
            arrivalDate: this.state.arrivalDate,
            disease: this.state.disease,
            medication: this.state.medication,
            appointmentDate: this.state.appointmentDate,
            contactNo: this.state.contactNo
        }
        this.props.addPatient(patient)
    }
    async setArrivalDate(){
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({           
                date: new Date()
            });
            if(action == DatePickerAndroid.dateSetAction){
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
                this.setState({appointmentDate: day+'/'+month+'/'+year})
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }
    render(){
        const {navigate} = this.props.navigation;
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
                        label="Appointment Date:"
                        placeholder="DD/MM/YY"
                        onFocus={() => this.setAppointment()}
                        value={this.state.appointmentDate}
                        onChangeText={(appointmentDate) => this.setState({appointmentDate})}
                        />
                    </CardSection>
                    <CardSection>
                        <Input 
                        label="Contact Number:"
                        placeholder="Enter Contact Number"
                        valuw={this.state.contactNo}
                        onChangeText={(contactNo) => this.setState({contactNo})}
                        />
                    </CardSection>
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