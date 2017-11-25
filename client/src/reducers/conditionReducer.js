import { FETCH_CONDITION_MESSAGE } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CONDITION_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}
