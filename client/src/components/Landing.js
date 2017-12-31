import React from 'react';
import jwt_decode from 'jwt-decode';

const Landing = () => {
  return (
    <h5>{`Hi there ${jwt_decode(localStorage.getItem('token')).name}`}</h5>
  );
};

export default Landing;
