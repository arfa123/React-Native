import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import {AppNavigator} from '../../AppNavigator';

const initialState = AppNavigator.router.getStateForAction(
    NavigationActions.navigate({
      routeName: 'login'
    })
);

export const NavReducer = (state = initialState, action) => {
  console.log("nav:",state,"&",action)
  const nextState = AppNavigator.router.getStateForAction(action, state);
  console.log("nav2:",nextState)
  return nextState || state;
};