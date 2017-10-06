import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';

class PatientList extends Component{
    constructor(props){
        super(props)
        this.state={
            patientID: undefined
        }
    }
    patientDetails(patient){
        if(this.props.selectedPatient === undefined){
            // this.setState({patientID: patient.id})
            this.props.visibleTabBar(patient.id)
        }
        else{
            // this.setState({patientID: undefined})
            this.props.visibleTabBar(undefined)
        }
    }
    render(){
        return(
            <View style={{flexDirection: 'column', justifyContent: 'flex-start', marginBottom: 20}}>
                {this.props.patientList.filter((x) => {
                    if(this.props.findPatientBy === 'name'){
                        return (x.name.toLowerCase().indexOf(this.props.search) !== -1)
                    }
                    if(this.props.findPatientBy === 'date'){
                        return (x.appointment.date.indexOf(this.props.search) !== -1)
                    }
                    else{
                        return x
                    }
                }).map((x,y) => {
                    if(this.props.selectedPatient !== undefined){
                        if(x.id === this.props.selectedPatient.id){
                        return(
                        <TouchableOpacity key={y} onPress={() => this.patientDetails(x)}>
                            <View style={[styles.containerStyle, {borderWidth: 5, borderColor: 'red'}]}>
                                <View style={styles.sectionStyle}>
                                    <Text style={styles.headingStyle}>Name:</Text>
                                    <Text style={styles.textStyle}>{x.name}</Text>
                                </View>
                                <View style={styles.sectionStyle}>
                                    <Text style={styles.headingStyle}>Age:</Text>
                                    <Text style={styles.textStyle}>{x.age}</Text>
                                </View>
                                <View style={styles.sectionStyle}>
                                    <Text style={styles.headingStyle}>Arrival Date:</Text>
                                    <Text style={styles.textStyle}>{x.arrivalDate}</Text>
                                </View>
                                <View style={styles.sectionStyle}>
                                    <Text style={styles.headingStyle}>Disease:</Text>
                                    <Text style={styles.textStyle}>{x.disease}</Text>
                                </View>
                                <View style={styles.sectionStyle}>
                                    <Text style={styles.headingStyle}>Medication:</Text>
                                    <Text style={styles.textStyle}>{x.medication}</Text>
                                </View>
                                <View style={styles.sectionStyle}>
                                    <Text style={styles.headingStyle}>Contact #:</Text>
                                    <Text style={styles.textStyle}>{x.contactNo}</Text>
                                </View>
                                <View style={styles.sectionStyle}>
                                <Text style={styles.headingStyle}>Appointment:</Text>
                                <View style={{flex: 2}}>
                                    <Text style={styles.textStyle}>{x.appointment.date}</Text>
                                    <Text style={styles.textStyle}>{x.appointment.time}</Text>
                                </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        )
                        }
                    }
                    return(
                    <TouchableOpacity key={y} onPress={() => this.patientDetails(x)}>
                        <View style={styles.containerStyle}>
                            <View style={styles.sectionStyle}>
                                <Text style={styles.headingStyle}>Name:</Text>
                                <Text style={styles.textStyle}>{x.name}</Text>
                            </View>
                            <View style={styles.sectionStyle}>
                                <Text style={styles.headingStyle}>Appointment:</Text>
                                <View style={{flex: 2}}>
                                    <Text style={styles.textStyle}>{x.appointment.date}</Text>
                                    <Text style={styles.textStyle}>{x.appointment.time}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    )
                })
                }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    containerStyle:{
        borderRadius: 10, 
        borderWidth: 2, 
        borderColor: 'blue', 
        margin: 5, 
        flexDirection: 'column', 
        justifyContent: 'flex-start'
    },
    sectionStyle:{
        flexDirection: 'row', 
        flex: 1
    },
    headingStyle:{
        fontSize: 20, 
        fontWeight: 'bold', 
        padding: 8, 
        flex: 1.6, 
        color: 'red'
    },
    textStyle:{
        fontSize: 20, 
        padding: 8, 
        flex: 2, 
        color: 'blue'
    }
})
const mapStateToProps = (state) => {
    return {
        patientList: state.PatientReducer.patients,
        selectedPatient: state.PatientReducer.selectedPatient
    }
}


export default connect(mapStateToProps,null)(PatientList);