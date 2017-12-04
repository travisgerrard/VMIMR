import { ADD_CONDITION, FETCH_ALL_CONDITIONS } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_ALL_CONDITIONS:
      return { ...state, [action.payload.prop]: action.payload.value };
    case ADD_CONDITION:
      return { ...state, condition: action.payload };
    default:
      return state;
  }
}
