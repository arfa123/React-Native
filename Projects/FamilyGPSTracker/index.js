import { AppRegistry } from 'react-native';
import App from './src/App';

AppRegistry.registerComponent('FamilyGPSTracker', () => App);
AppRegistry.registerHeadlessTask('SomeTask', () => {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log("Headlessposi:",position)
        
    },(error) => {
        console.log("Headlwesserr:",error)
        
    })
})