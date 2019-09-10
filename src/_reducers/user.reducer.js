import { userConstants } from '../_constants';

export function user(state = {}, action) {
  
  switch (action.type) {
    case userConstants.GETUSER_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETUSER_SUCCESS:
      return {
        data: action.user.data
      };
    case userConstants.GETUSER_FAILURE:
      return {
        error: action.error
      };
    default:
      console.log('state',state);
      return state;
  }
}