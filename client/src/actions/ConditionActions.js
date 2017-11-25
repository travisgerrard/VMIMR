import axios from 'axios';
import { FETCH_CONDITION_MESSAGE } from './types';

export const fetchConditionMessage = () => async dispatch => {
  const res = await axios.get('/api/conditions', {
    headers: { authorization: localStorage.getItem('token') }
  });
  dispatch({
    type: FETCH_CONDITION_MESSAGE,
    payload: res.data.message
  });
};
