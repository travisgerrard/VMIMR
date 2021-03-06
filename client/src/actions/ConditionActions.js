import axios from 'axios';
import {
  ADD_CONDITION,
  FETCH_ALL_CONDITIONS,
  ADD_CONDITION_SUCCESS,
  ADD_CONDITION_FAIL,
  UPDATE_CONDITION,
  DELETE_CONDITION,
  SET_ROTATION_SELECTED,
  CLEAR_ERROR,
  CLEAR_SEARCH_TERM,
  CHANGE_SEARCH_TERM,
  SHOW_ADD_BUTTON,
  HIDE_ADD_BUTTON,
  SHOW_ADD_CARD,
  HIDE_ADD_CARD,
  ADD_LEARNING_TO_CONDITION,
  UPDATE_LEARNING,
  DELETE_LEARNING,
  ALL_LEARNING_FOR_CONDITION
} from './types';

axios.defaults.headers.common['authorization'] = localStorage.getItem(
  'VMIMRToken'
);

export const fetchAllConditions = () => async dispatch => {
  const res = await axios.get('/api/condition');
  dispatch({
    type: FETCH_ALL_CONDITIONS,
    payload: res.data
  });
};

export const fetchAllLearningForCondition = conditionId => async dispatch => {
  const res = await axios.get(`/api/condition/${conditionId}`);
  dispatch({
    type: ALL_LEARNING_FOR_CONDITION,
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

export const addLearningToCondition = props => async dispatch => {
  try {
    const res = await axios.post('/api/condition/learning', props);
    dispatch({ type: ADD_LEARNING_TO_CONDITION, payload: res.data });
  } catch (err) {
    console.log(err.response.data.error);
  }
};

export const updateCondition = props => async dispatch => {
  console.log(props);
  try {
    const res = await axios.put('/api/condition/', props);
    dispatch({ type: UPDATE_CONDITION, payload: res.data });
  } catch (err) {
    console.log(err.response.data.error);
  }
};

export const deleteCondition = props => async dispatch => {
  try {
    const res = await axios.delete(`/api/condition/${props}`);
    dispatch({ type: DELETE_CONDITION, payload: res.data });
  } catch (err) {
    console.log(err.response.data.error);
  }
};

export const updateLearning = props => async dispatch => {
  try {
    const res = await axios.put('/api/condition/learning', props);
    dispatch({ type: UPDATE_LEARNING, payload: res.data });
  } catch (err) {
    console.log(err.response.data.error);
  }
};

export const deleteLearning = props => async dispatch => {
  try {
    const res = await axios.delete(`/api/condition/learning/${props}`);
    dispatch({ type: DELETE_LEARNING, payload: res.data });
  } catch (err) {
    console.log(err.response.data.error);
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
