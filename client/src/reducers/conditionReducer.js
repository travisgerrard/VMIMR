import { ADD_CONDITION, FETCH_ALL_CONDITIONS } from '../actions/types';

export default function(state = {}, action) {
  //console.log(action.payload);
  switch (action.type) {
    case FETCH_ALL_CONDITIONS:
      return action.payload;
    case ADD_CONDITION:
      return [...state, action.payload];
    default:
      return state;
  }
}
