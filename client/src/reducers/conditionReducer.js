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
  HIDE_ADD_CARD,
  ADD_LEARNING_TO_CONDITION,
  UPDATE_LEARNING,
  DELETE_LEARNING
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

function theListOfConditionsToShow(searchTerm, state, addedObject) {
  if (addedObject) {
    state = { ...state, [addedObject._id]: addedObject };
  }
  var searchTermLowerCare = searchTerm.toLowerCase();
  // Create filtered array that only contains objects that are
  // 1. In the selected rotations
  // 2. Match the searchTerm criteria
  var arrayOfConditionsToShow = _.filter(state, condition => {
    if (_.indexOf(condition.tags, state.rotationSelected) >= 0) {
      return _.includes(condition.condition.toLowerCase(), searchTermLowerCare);
    }
  });

  return arrayOfConditionsToShow;
}

export default function(state = INITIAL_STATE, action) {
  var listOfConditionsToShow;
  switch (action.type) {
    case FETCH_ALL_CONDITIONS:
      //When linking to conditions
      // The rotaiton selected occurs faster than server call
      // As such need if statement below to factor in selected rotation
      if (state.rotationSelected === '') {
        return {
          ...state,
          ...action.payload,
          filteredConditions: _.values(action.payload)
        };
      } else {
        listOfConditionsToShow = theListOfConditionsToShow(state.searchTerm, {
          ...state,
          ...action.payload
        });
        return {
          ...state,
          ...action.payload,
          filteredConditions: listOfConditionsToShow
        };
      }
    case ADD_CONDITION:
      return { ...state, loadingAddCondition: true };
    case ADD_CONDITION_SUCCESS:
      listOfConditionsToShow = theListOfConditionsToShow(
        '',
        state,
        action.payload
      );
      return {
        ...state,
        [action.payload._id]: action.payload,
        filteredConditions: listOfConditionsToShow,
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
      listOfConditionsToShow = theListOfConditionsToShow(state.searchTerm, {
        ...state,
        rotationSelected: action.payload
      });
      return {
        ...state,
        rotationSelected: action.payload,
        filteredConditions: listOfConditionsToShow
      };
    case CLEAR_ERROR:
      return { ...state, error: '' };
    case CLEAR_SEARCH_TERM:
      return { ...state, searchTerm: '' };
    case SHOW_ADD_BUTTON:
      return { ...state, showAddButton: true };
    case HIDE_ADD_BUTTON:
      return { ...state, showAddbutton: false };
    case CHANGE_SEARCH_TERM:
      const searchTerm = action.payload;
      listOfConditionsToShow = theListOfConditionsToShow(searchTerm, state);
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
    case SHOW_ADD_CARD:
      return { ...state, showAddCard: true };
    case HIDE_ADD_CARD:
      return { ...state, showAddCard: false };
    case ADD_LEARNING_TO_CONDITION:
      listOfConditionsToShow = theListOfConditionsToShow(
        state.searchTerm,
        state,
        action.payload
      );
      return {
        ...state,
        [action.payload._id]: action.payload,
        filteredConditions: listOfConditionsToShow
      };
    case UPDATE_LEARNING:
      listOfConditionsToShow = theListOfConditionsToShow(
        state.searchTerm,
        state,
        action.payload
      );
      return {
        ...state,
        [action.payload._id]: action.payload,
        filteredConditions: listOfConditionsToShow
      };
    case DELETE_LEARNING:
      listOfConditionsToShow = theListOfConditionsToShow(
        state.searchTerm,
        state,
        action.payload
      );
      return {
        ...state,
        [action.payload._id]: action.payload,
        filteredConditions: listOfConditionsToShow
      };
    default:
      return state;
  }
}
