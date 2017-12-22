import axios from 'axios';
import {
  ADD_CONDITION,
  FETCH_ALL_CONDITIONS,
  ADD_CONDITION_SUCCESS,
  ADD_CONDITION_FAIL,
  SET_ROTATION_SELECTED,
  CLEAR_ERROR,
  CLEAR_SEARCH_TERM,
  CHANGE_SEARCH_TERM,
  SHOW_ADD_BUTTON,
  HIDE_ADD_BUTTON,
  SHOW_ADD_CARD,
  HIDE_ADD_CARD
} from './types';

axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

export const fetchAllConditions = () => async dispatch => {
  const res = await axios.get('/api/condition');
  dispatch({
    type: FETCH_ALL_CONDITIONS,
    payload: res.data
  });
};

export const addCondition = props => async dispatch => {
  dispatch({ type: ADD_CONDITION });

  try {
    const res = await axios.post('/api/condition', props);
    dispatch({ type: ADD_CONDITION_SUCCESS, payload: res.data });
  } catch (err) {
    console.log(err.response.data.error);
    dispatch({ type: ADD_CONDITION_FAIL, payload: err.response.data.error });
  }
};

export const setRotationSelected = rotation => dispatch => {
  dispatch({ type: SET_ROTATION_SELECTED, payload: rotation });
};

export const clearError = () => dispatch => {
  dispatch({ type: CLEAR_ERROR });
};

export const clearSearchTerm = () => dispatch => {
  dispatch({ type: CLEAR_SEARCH_TERM });
};

export const showAddButton = () => dispatch => {
  dispatch({ type: SHOW_ADD_BUTTON });
};

export const hideAddButton = () => dispatch => {
  dispatch({ type: HIDE_ADD_BUTTON });
};

export const showAddCard = () => dispatch => {
  dispatch({ type: SHOW_ADD_CARD });
};

export const hideAddCard = () => dispatch => {
  dispatch({ type: HIDE_ADD_CARD });
};

export const changeSearchTerm = searchTerm => dispatch => {
  dispatch({ type: CHANGE_SEARCH_TERM, payload: searchTerm });
};
