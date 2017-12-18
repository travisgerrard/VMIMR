import axios from 'axios';
import {
  ADD_CONDITION,
  FETCH_ALL_CONDITIONS,
  ADD_CONDITION_SUCCESS,
  ADD_CONDITION_FAIL,
  CLEAR_ERROR
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

export const clearError = () => dispatch => {
  dispatch({ type: CLEAR_ERROR });
};
