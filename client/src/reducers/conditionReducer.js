import {
  ADD_CONDITION,
  ADD_CONDITION_SUCCESS,
  ADD_CONDITION_FAIL,
  SET_ROTATION_SELECTED,
  FETCH_ALL_CONDITIONS,
  CLEAR_ERROR,
  CLEAR_SEARCH_TERM,
  CHANGE_SEARCH_TERM,
  SHOW_ADD_BUTTON,
  HIDE_ADD_BUTTON,
  SHOW_ADD_CARD,
  HIDE_ADD_CARD
} from '../actions/types';
import _ from 'lodash';

const INITIAL_STATE = {
  loadingAddCondition: false,
  error: '',
  searchTerm: '',
  showAddButton: false,
  showAddCard: false,
  rotationSelected: '',
  filteredConditions: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ALL_CONDITIONS:
      return { ...state, ...action.payload };
    case ADD_CONDITION:
      return { ...state, loadingAddCondition: true };
    case ADD_CONDITION_SUCCESS:
      return {
        ...state,
        [action.payload._id]: action.payload,
        loadingAddCondition: false,
        error: '',
        showAddCard: false,
        showAddButton: false,
        searchTerm: ''
      };
    case ADD_CONDITION_FAIL:
      return {
        ...state,
        loadingAddCondition: false,
        error: action.payload
      };
    case SET_ROTATION_SELECTED:
      return { ...state, rotationSelected: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: '' };
    case CLEAR_SEARCH_TERM:
      return { ...state, searchTerm: '' };
    case SHOW_ADD_BUTTON:
      return { ...state, showAddButton: true };
    case HIDE_ADD_BUTTON:
      return { ...state, showAddbutton: false };
    case CHANGE_SEARCH_TERM:
      // If there is a search term
      if (action.payload !== '') {
        var searchTermLowerCare = action.payload.toLowerCase();
        // Create filtered array that only contains objects that are
        // 1. In the selected rotations
        // 2. Match the searchTerm criteria
        var listOfConditionsToShow = _.filter(state, condition => {
          if (_.indexOf(condition.tags, state.rotationSelected) >= 0) {
            return _.includes(
              condition.condition.toLowerCase(),
              searchTermLowerCare
            );
          }
        });
        if (listOfConditionsToShow.length === 0) {
          return {
            ...state,
            searchTerm: action.payload,
            filteredConditions: listOfConditionsToShow,
            showAddButton: true
          };
        } else {
          return {
            ...state,
            searchTerm: action.payload,
            filteredConditions: listOfConditionsToShow,
            showAddButton: false,
            showAddCard: false
          };
        }
      }
      // If search term is blank return defaults
      return {
        ...state,
        searchTerm: action.payload,
        filteredConditions: [],
        showAddButton: false,
        showAddCard: false
      };
    case SHOW_ADD_CARD:
      return { ...state, showAddCard: true };
    case HIDE_ADD_CARD:
      console.log('Should run');
      return { ...state, showAddCard: false };
    default:
      return state;
  }
}
