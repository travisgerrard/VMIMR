import axios from 'axios';
import { FETCH_ALL_USERS } from './types';

axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

export const fetchAllUsers = () => async dispatch => {
  const res = await axios.get('/api/users');
  dispatch({
    type: FETCH_ALL_USERS,
    payload: res.data
  });
};
