import React from "react";
import {
	View,
	TextInput,
	Button,
	Alert
} from "react-native";
import Axios from "axios";
import Spinner from 'react-native-loading-spinner-overlay';

class EditEmployee extends React.Component {

	state = {
		loading: false,
		name: "",
		age: "",
		salary: "",
		id: ""
	}

	componentDidMount() {
		const { employee_name, employee_age, employee_salary, id } = this.props.route.params.employee;
		this.setState({
			name: employee_name,
			age: employee_age,
			salary: employee_salary,
			id
		});
	}

	editEmployee = async () => {
		if (this.state.name && this.state.age && this.state.salary && this.state.id) {
			try {
				this.setState({ loading: true });
				const employee = {
					name: this.state.name,
					age: this.state.age,
					salary: this.state.salary
				};
				const response = await Axios.put(`http://dummy.restapiexample.com/api/v1/update/${this.state.id}`, employee);
				console.log("response: ", response.data);
				this.setState({
					loading: false,
				}, () => this.props.route.params.refresh());
				Alert.alert("Employee Updated Successfully", "", [
					{
						text: "OK",
						onPress: () => this.props.navigation.goBack()
					}
				], {cancelable: false});
			} catch(e) {
				console.log("eror: ",e )
				this.setState({ loading: false });
				Alert.alert("Something went wrong");
			}
		} else {
			Alert.alert("Please Fill all input fields");
		}
	}

	render() {
		return (
			<View>
				<Spinner visible={this.state.loading} />
				<View style={{margin: 10}}>
					<TextInput
						placeholder="Employee Name"
						underlineColorAndroid="blue"
						style={{marginVertical: 10}}
						value={this.state.name}
						onChangeText={(name) => this.setState({ name })}
					/>
					<TextInput
						placeholder="Employee Age"
						underlineColorAndroid="blue"
						style={{marginVertical: 10}}
						value={this.state.age}
						onChangeText={(age) => this.setState({ age })}
					/>
					<TextInput
						placeholder="Employee Salary"
						underlineColorAndroid="blue"
						style={{marginVertical: 10}}
						value={this.state.salary}
						onChangeText={(salary) => this.setState({ salary })}
					/>
					<View style={{marginVertical: 10}}>
						<Button
							title="Edit Employee"
							onPress={this.editEmployee}
						/>
					</View>
				</View>
			</View>
		);
	}
}

export default EditEmployee;