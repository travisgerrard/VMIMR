import { FETCH_LAST_FIVE_LEARNINGS, UNAUTH_USER } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_LAST_FIVE_LEARNINGS:
      return action.payload;
    case UNAUTH_USER:
      return [];
    default:
      return [...state];
  }
}
