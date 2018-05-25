import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import {AppNavigator} from '../../AppNavigtor';

const initialState = AppNavigator.router.getStateForAction(
    NavigationActions.navigate({
      routeName: 'login'
    })
    // AppNavigator.router.getActionForPathAndParams('login')
);

export const navReducer = (state = initialState, action) => {
  console.log("nav:",state,"&",action)
  const nextState = AppNavigator.router.getStateForAction(action, state);
  console.log("nav2:",nextState)
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};