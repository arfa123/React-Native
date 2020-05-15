import React from "react";
import {
	View,
	Text,
	FlatList,
	Button,
	StyleSheet
} from "react-native";
import Axios from "axios";
import Spinner from 'react-native-loading-spinner-overlay';

class Employees extends React.Component {

	state = {
		loading: false,
		employeesList: []
	}

	componentDidMount() {
		this.getEmployees();	
	}

	getEmployees = async () => {
		this.setState({ loading: true });
		try {
			const response = await Axios.get("http://dummy.restapiexample.com/api/v1/employees");
			this.setState({
				employeesList: response.data.data,
				loading: false
			});
		} catch(e) {
			this.setState({ loading: false });
		}
	}

	addEmployee = () => {
		this.props.navigation.navigate("addEmployee", { refresh: this.getEmployees });
	};

	deleteEmployee = async (employeeId) => {
		this.setState({ loading: true });
		try {
			const response = await Axios.delete(`http://dummy.restapiexample.com/api/v1/delete/${employeeId}`);
			this.getEmployees();
		} catch(e) {
			this.setState({ loading: false });
		}
	};

	editEmployee = (employee) => {
		this.props.navigation.navigate("editEmployee", { employee, refresh: this.getEmployees });
	};

	renderEmployee = ({ item }) => {
		return (
			<View style={styles.employeeCont}>
				<View style={styles.employeeDetails}>
					<Text style={styles.employeeName}>Name: {item.employee_name}</Text>
					<Text>Age: {item.employee_age}</Text>
					<Text>Salary: {item.employee_salary}</Text>
				</View>
				<View style={styles.employeeBtns}>
					<Button
						title="Edit"
						onPress={() => this.editEmployee(item)}
					/>
					<Button
						title="Delete"
						color="red"
						onPress={() => this.deleteEmployee(item.id)}
					/>
				</View>
			</View>
		);
	};

	renderKey = (item) => item.id;
	
	render() {
		const { employeesList } = this.state;
		return (
			<View style={{flex: 1}}>
				<Spinner visible={this.state.loading} />
				<FlatList
					data={employeesList}
					renderItem={this.renderEmployee}
					keyExtractor={this.renderKey}
					style={styles.employeesListCont}
					ItemSeparatorComponent={() => <View style={{height: 10}} />}
					showsVerticalScrollIndicator={false}
					ListHeaderComponent={() => <Button
						title="Add Employee"
						onPress={this.addEmployee}
					/>}
				/>
			</View>
		);
	}
}

export default Employees;

const styles = StyleSheet.create({
	employeeCont: {
		elevation: 1,
		borderRadius: 5,
		minHeight: 50,
		padding: 10,
		marginVertical: 10,
		flexDirection: "row"
	},
	employeeDetails: {
		flex: 0.8
	},
	employeeBtns: {
		flex: 0.2
	},
	employeeName: {
		fontSize: 20
	},
	employeesListCont: {
		margin: 10
	}
});