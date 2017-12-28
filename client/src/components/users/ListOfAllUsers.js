import React, { Component } from 'react';
import { connect } from 'react-redux';

class ListOfAllUsers extends Component {
  render() {
    return <div>List of all users!</div>;
  }
}

function mapStateToProps(state) {
  return state;
}

export default mapStateToProps(ListOfAllUsers);
