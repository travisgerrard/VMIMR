import axios from 'axios';
import { FETCH_ALL_USERS, SUBMIT_USER } from './types';

axios.defaults.headers.common['authorization'] = localStorage.getItem('VMIMRToken');

export const fetchAllUsers = () => async dispatch => {
  const res = await axios.get('/api/users');
  dispatch({
    type: FETCH_ALL_USERS,
    payload: res.data
  });
};

export const submitUser = (values, history) => async dispatch => {
  console.log(values, history);
  const res = await axios.post('/api/users', values);

  history.push('/users');
  dispatch({ type: SUBMIT_USER, payload: res.data });
};
