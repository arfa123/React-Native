import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Employees from "./src/screens/employees";
import AddEmployee from "./src/screens/addEmployee";
import EditEmployee from "./src/screens/editEmployee";

const Stack = createStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="employees" component={Employees} options={{title: "Employees"}}/>
				<Stack.Screen name="addEmployee" component={AddEmployee} options={{title: "Add Employee"}}/>
				<Stack.Screen name="editEmployee" component={EditEmployee} options={{title: "Edit Employee"}}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;