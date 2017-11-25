import axios from 'axios';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';

export const signinUser = ({ email, password, history }) => async dispatch => {
  try {
    // Submit email/password to server
    const res = await axios.post('/api/signin', { email, password });
    // IF req good
    // - Update state to indicate authenticated
    dispatch({ type: AUTH_USER });
    // - Save the JWT token
    localStorage.setItem('token', res.data.token);
    // - Redirect to the rout '/feature'
    history.push('/feature');
  } catch (err) {
    // If req is bad
    // - Show an error to the user
    dispatch(authError('Bad Login Info'));
  }
};

export const signupUser = ({ email, password, history }) => async dispatch => {
  try {
    const res = await axios.post('/api/signup', { email, password });
    dispatch({ type: AUTH_USER });
    localStorage.setItem('token', res.data.token);
    history.push('/feature');
  } catch (err) {
    dispatch(authError(err.response.data.error));
  }
};

export const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};

export const signoutUser = () => {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
};

export const fetchMessage = () => async dispatch => {
  const res = await axios.get('/api/', {
    headers: { authorization: localStorage.getItem('token') }
  });
  dispatch({
    type: FETCH_MESSAGE,
    payload: res.data.message
  });
};
