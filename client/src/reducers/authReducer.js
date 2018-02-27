import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_MESSAGE
} from '../actions/types';
import jwt_decode from 'jwt-decode';

export default function(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        error: '',
        authenticated: true,
        userDetails: jwt_decode(action.payload)
      };
    case UNAUTH_USER:
      return { ...state, authenticated: false, userDetails: '' };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}
