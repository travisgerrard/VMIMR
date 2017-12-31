import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';

class Landing extends Component {
  renderLandingPage = () => {
    if (localStorage.getItem('token') !== null) {
      return (
        <h5>{`Hi there ${jwt_decode(localStorage.getItem('token')).name}`}</h5>
      );
    }
    return <h5>Login to get started</h5>;
  };

  render() {
    return <div>{this.renderLandingPage()}</div>;
  }
}

export default Landing;
