import axios from 'axios';
import {
  FETCH_CONDITION_MESSAGE,
  ADD_CONDITION,
  FETCH_ALL_CONDITIONS
} from './types';

axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

export const fetchAllConditions = () => async dispatch => {
  const res = await axios.get('/api/condition');
  dispatch({
    type: FETCH_ALL_CONDITIONS,
    payload: res.data
  });
};

export const addCondition = (rotation, condition) => async dispatch => {
  const res = await axios.post('/api/condition', { rotation, condition });
  dispatch({ type: ADD_CONDITION, payload: res.data });
};
