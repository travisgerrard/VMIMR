import { FETCH_ALL_USERS } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ALL_USERS:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
}
