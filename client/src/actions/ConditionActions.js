import axios from 'axios';
import {
  FETCH_CONDITION_MESSAGE,
  ADD_CONDITION,
  FETCH_ALL_CONDITIONS
} from './types';

export const fetchAllConditions = () => async dispatch => {
  const res = await (axios.get('/api/condition'),
  {
    headers: { authorization: localStorage.getItem('token') }
  });
  dispatch({
    type: FETCH_ALL_CONDITIONS,
    payload: res.data
  });
};

export const addCondition = (rotation, condition) => async dispatch => {
  console.log(rotation, condition);

  const res = await axios.post(
    '/api/condition',
    { rotation, condition },
    {
      headers: { authorization: localStorage.getItem('token') }
    }
  );
  console.log(res.data);
  //  dispatch({ type: ADD_CONDITION, payload: res.data });
};
