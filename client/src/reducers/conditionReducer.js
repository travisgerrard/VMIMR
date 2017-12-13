import {
  ADD_CONDITION,
  ADD_CONDITION_SUCCESS,
  ADD_CONDITION_FAIL,
  FETCH_ALL_CONDITIONS,
  CLEAR_ERROR
} from '../actions/types';

const INITIAL_STATE = {
  loadingAddCondition: false,
  error: ''
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ALL_CONDITIONS:
      return action.payload;
    case ADD_CONDITION:
      return { ...state, loadingAddCondition: true };
    case ADD_CONDITION_SUCCESS:
      return {
        ...state,
        [action.payload._id]: action.payload,
        loadingAddCondition: false,
        error: ''
      };
    case ADD_CONDITION_FAIL:
      return {
        ...state,
        loadingAddCondition: false,
        error: action.payload
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: ''
      };
    default:
      return state;
  }
}
