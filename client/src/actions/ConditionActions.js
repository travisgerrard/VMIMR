import axios from 'axios';
import { FETCH_CONDITION_MESSAGE, ADD_CONDITION } from './types';

export const fetchConditionMessage = () => async dispatch => {
  const res = await axios.get('/api/conditions', {
    headers: { authorization: localStorage.getItem('token') }
  });
  dispatch({
    type: FETCH_CONDITION_MESSAGE,
    payload: res.data.message
  });
};

export const addCondition = (title, rotation) => async dispatch => {
  const res = await axios.post(
    '/api/condition',
    {
      headers: { authorization: localStorage.getItem('token') }
    },
    { title, rotation }
  );

  dispatch({ type: ADD_CONDITION, payload: res.data });
};
