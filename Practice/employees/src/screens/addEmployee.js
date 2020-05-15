import React from "react";
import {
	View,
	TextInput,
	Button,
	Alert
} from "react-native";
import Axios from "axios";
import Spinner from 'react-native-loading-spinner-overlay';

class AddEmployee extends React.Component {

	state = {
		loading: false,
		name: "",
		age: "",
		salary: "",
	}

	addEmployee = async () => {
		if (this.state.name && this.state.age && this.state.salary) {
			try {
				this.setState({ loading: true });
				const employee = {
					name: this.state.name,
					age: this.state.age,
					salary: this.state.salary
				};
				const response = await Axios.post("http://dummy.restapiexample.com/api/v1/create", employee);
				this.setState({
					loading: false,
					name: "",
					age: "",
					salary: "",
				}, () => this.props.route.params.refresh());
				Alert.alert("Employee Added Successfully");
			} catch(e) {
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
							title="Add Employee"
							onPress={this.addEmployee}
						/>
					</View>
				</View>
			</View>
		);
	}
}

export default AddEmployee;