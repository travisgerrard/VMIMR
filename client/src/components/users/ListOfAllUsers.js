import React, { Component } from 'react';
import { List, Container, Button, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import LIST_ALL_USERS from '../../queries/ListOfAllUsers';

class ListOfAllUsers extends Component {
  listOfUsers = () => {
    return (
      <Query query={LIST_ALL_USERS}>
        {({ loading, error, data }) => {
          if (loading) return <Loader active inline="centered" />;
          if (error) return 'Error';

          return data.listOfUsers.map(user => {
            return (
              <List.Item key={user.id}>
                <List.Icon
                  name="user circle outline"
                  size="large"
                  verticalAlign="middle"
                />
                <List.Content>
                  <List.Header>
                    <Link to={`/users/user/${user.id}`}>{user.name}</Link>
                  </List.Header>
                  <List.Description as="a">{user.email}</List.Description>
                </List.Content>
              </List.Item>
            );
          });
        }}
      </Query>
    );
  };

  render() {
    return (
      <Container style={{ marginTop: 15, marginBottom: 10 }}>
        <List divided relaxed>
          {this.listOfUsers()}
        </List>
        <Link to="/users/newUser" style={{ color: 'white' }}>
          <Button color="green">New User</Button>
        </Link>
      </Container>
    );
  }
}

export default ListOfAllUsers;
