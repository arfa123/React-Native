import React, {Component} from 'react';
import {View, Text, DatePickerAndroid, ScrollView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
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
            contactNo: this.props.selectedPatient.contactNo
        }
    }
    componentDidUpdate(){
        if(this.props.patientSaved){
            this.props.navigation.navigate('findpatient')
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
                        label="Appointment Date:"
                        value={this.state.appointmentDate}
                        onFocus={() => this.setAppointment()}
                        onChangeText={(appointmentDate) => this.setState({appointmentDate})}
                        />
                    </CardSection>
                    <CardSection>
                        <Input 
                        label="Contact Number:"
                        value={this.state.contactNo}
                        onChangeText={(contactNo) => this.setState({contactNo})}
                        />
                    </CardSection>
                    <CardSection>
                        <Button 
                        Component={TouchableOpacity}
                        title="Save Patient"
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
                        onPress={() => navigate('findpatient')}
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