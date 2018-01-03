import React, { Component } from 'react';
import LastFiveConditions from './landing/LastFiveConditions';
import jwt_decode from 'jwt-decode';

const Landing = () => {
  var landingPage;
  if (localStorage.getItem('token') !== null) {
    landingPage = (
      <div>
        <h5>{`Hi there ${jwt_decode(localStorage.getItem('token')).name}`}</h5>
        <LastFiveConditions />
      </div>
    );
  } else {
    landingPage = <h5>Login to get started</h5>;
  }

  return <div>{landingPage}</div>;
};

export default Landing;
