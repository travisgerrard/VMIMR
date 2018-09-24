import jwt_decode from 'jwt-decode';

export const admin = () => {
  if (localStorage.getItem('VMIMRToken')) {
    return jwt_decode(localStorage.getItem('VMIMRToken'));
  }
  return false;
};

export const id = () => {
  if (localStorage.getItem('VMIMRToken')) {
    return jwt_decode(localStorage.getItem('VMIMRToken')).id;
  }
  return '';
};

export const currentUser = () => {
  if (localStorage.getItem('VMIMRToken')) {
    return jwt_decode(localStorage.getItem('VMIMRToken'));
  }
  return '';
};
