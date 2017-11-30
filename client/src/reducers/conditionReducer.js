import { FETCH_CONDITION_MESSAGE, ADD_CONDITION } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CONDITION_MESSAGE:
      return { ...state, message: action.payload };
    case ADD_CONDITION:
      return { ...state, condition: action.payload };
    default:
      return state;
  }
}
