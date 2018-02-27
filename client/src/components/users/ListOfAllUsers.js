import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import _ from 'lodash';

class ListOfAllUsers extends Component {
  componentWillMount() {
    this.props.fetchAllUsers();
  }

  listOfUsers = () => {
    return _.map(this.props.users, user => {
      return (
        <List.Item key={user._id}>
          <List.Icon
            name="user circle outline"
            size="large"
            verticalAlign="middle"
          />
          <List.Content>
            <List.Header>
              <Link to={`/users/user/${user._id}`}>{user.name}</Link>
            </List.Header>
            <List.Description as="a">{user.email}</List.Description>
          </List.Content>
        </List.Item>
      );
    });
  };

  render() {
    return (
      <div>
        <Container style={{ marginTop: '4.5em' }}>
          <List divided relaxed>
            {this.listOfUsers()}
          </List>
          <Link to="/users/newUser" style={{ color: 'white' }}>
            <Button color="green">New User</Button>
          </Link>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, actions)(ListOfAllUsers);
