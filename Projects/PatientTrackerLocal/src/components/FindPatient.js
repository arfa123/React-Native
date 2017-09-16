import React, {Component} from 'react';
import {View, Text, Picker, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Card, Button} from 'react-native-elements';
import {CardSection, Input} from './common';
import {PatientMiddleware} from '../store/middleware/patientMiddleware';
import PatientList from './PatientList';

class FindPatient extends Component {
    constructor(props){
        super(props)
        this.state = {
            findPatientBy: '',
            search: ''
        }
    }
    componentDidMount(){
        this.props.getPatient()
    }
    trackPatientInput(){
        if(this.state.findPatientBy === 'name'){
            return(
                <Input 
                placeholder="Enter Patient Name"
                label="Track Patient"
                onChangeText={(search) => this.setState({search})}
                />
            )
        }
        if(this.state.findPatientBy === 'date'){
            return(
                <Input 
                placeholder="DD/MM/YY"
                label="Track Patient"
                onFocus={() => this.setAppointment()}
                onChangeText={(search) => this.setState({search})}
                />
            )
        }
    }
    async setAppointment(){
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date()
            });
            if(action === DatePickerAndroid.dateSetAction){
                this.setState({search: day+'/'+month+'/'+year})
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }
    render(){
        return(
            <ScrollView>
            <View>
                <Card
                title="Track Patient"
                titleStyle={{fontSize:30}}
                wrapperStyle={{backgroundColor: '#ffffff'}}
                containerStyle={{borderWidth: 2, borderColor: 'green', borderRadius:5}}>
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
                            <Picker.Item label="Track by Name" value="name"/>
                            <Picker.Item label="Track by Appointment Date" value="date"/>
                        </Picker>
                    </CardSection>
                    
                        <PatientList search={this.state.search} findPatientBy={this.state.findPatientBy}/>
                    
                </Card>
            </View>
            </ScrollView>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        patientList: state.PatientReducer.patients
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getPatient: () => {
            dispatch(PatientMiddleware.getPatient())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FindPatient);