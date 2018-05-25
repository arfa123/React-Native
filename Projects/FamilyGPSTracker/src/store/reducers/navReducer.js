import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import {AppNavigator} from '../../AppNavigator';

const initialState = AppNavigator.router.getStateForAction(
    NavigationActions.navigate({
      routeName: 'login'
    })
);

export const NavReducer = (state = initialState, action) => {
  let nextState;
  switch(action.type){
    case 'LOGIN':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({
          routeName: 'map'
        }), state
      )
      break;
    case 'SIGNUP':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({
          routeName: 'map'
        }), state
      )
      break;
    case 'LOGOUT':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({
          routeName: 'login'
        }), state
      )
      break;
    case 'NEW_CIRCLE':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({
          routeName: 'addcircle'
        }), state
      )
      break;
    case 'CIRCLE_ADDED':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({
          routeName: 'map'
        }), state
      )
      break;
    case 'INVITE':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({
          routeName: 'invite'
        }), state
      )
      break;
    case 'INVITATION_SENDED':
    nextState = AppNavigator.router.getStateForAction(
      NavigationActions.navigate({
        routeName: 'map'
      }), state
    )
    break;
    case 'INVITATIONS':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({
          routeName: 'invitations'
        }), state
      )
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state)
      break;
  }
  // console.log("nav:",state,"&",action)
  // const nextState = AppNavigator.router.getStateForAction(action, state);
  // console.log("nav2:",nextState)
  return nextState || state;
};