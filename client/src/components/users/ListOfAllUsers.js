import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
import * as actions from '../../actions';
import _ from 'lodash';

class ListOfAllUsers extends Component {
  componentWillMount() {
    this.props.fetchAllUsers();
  }

  listOfUsers = () => {
    return _.map(this.props.users, user => {
      console.log(user);
      return <List.Item>{user.email}</List.Item>;
    });
  };

  render() {
    return <List>{this.listOfUsers()}</List>;
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(ListOfAllUsers);
