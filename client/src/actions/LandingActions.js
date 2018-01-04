import axios from 'axios';
import { FETCH_LAST_FIVE_LEARNINGS } from './types';

axios.defaults.headers.common['authorization'] = localStorage.getItem('token');

export const fetchLastFiveConditions = () => async dispatch => {
  const res = await axios.get('/api/landing/lastfivelearnings');
  dispatch({
    type: FETCH_LAST_FIVE_LEARNINGS,
    payload: res.data
  });
};
