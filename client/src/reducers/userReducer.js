import { FETCH_ALL_USERS, SUBMIT_USER, UNAUTH_USER } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ALL_USERS:
      return { ...state, ...action.payload };
    case SUBMIT_USER:
      console.log(action.payload);
      console.log(state);
      return { ...state, [action.payload._id]: action.payload };
    case UNAUTH_USER:
      return {};
    default:
      return { ...state };
  }
}
