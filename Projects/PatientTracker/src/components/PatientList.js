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
        this.setState({patientID: patient.id})
        this.props.visibleTabBar(patient.id)
    }
    render(){
        return(
            <View style={{flexDirection: 'column', justifyContent: 'flex-start', marginBottom: 20}}>
                {this.props.patientList.filter((x) => {
                    if(this.props.findPatientBy === 'name'){
                        return (x.name.indexOf(this.props.search) !== -1)
                    }
                    if(this.props.findPatientBy === 'date'){
                        return (x.appointmentDate.indexOf(this.props.search) !== -1)
                    }
                    else{
                        return x
                    }
                }).map((x,y) => {
                    if(x.id === this.state.patientID){
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
                                    <Text style={styles.headingStyle}>Appointment Date:</Text>
                                    <Text style={styles.textStyle}>{x.appointmentDate}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        )
                    }
                    return(
                    <TouchableOpacity key={y} onPress={() => this.patientDetails(x)}>
                        <View style={styles.containerStyle}>
                            <View style={styles.sectionStyle}>
                                <Text style={styles.headingStyle}>Name:</Text>
                                <Text style={styles.textStyle}>{x.name}</Text>
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
                                <Text style={styles.headingStyle}>Appointment Date:</Text>
                                <Text style={styles.textStyle}>{x.appointmentDate}</Text>
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
        fontSize: 18, 
        fontWeight: 'bold', 
        padding: 10, 
        flex: 1.5, 
        color: 'red'
    },
    textStyle:{
        fontSize: 18, 
        padding: 10, 
        flex: 2, 
        color: 'blue'
    }
})
const mapStateToProps = (state) => {
    return {
        patientList: state.PatientReducer.patients
    }
}


export default connect(mapStateToProps,null)(PatientList);