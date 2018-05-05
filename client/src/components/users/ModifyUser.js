import React, { Component } from 'react';
import { Container, Form, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';

import USER_WITH_ID from '../../queries/UserWithId';
import ADD_OR_MODIFY_USER from '../../mutations/AddUser';

class ModifyUser extends Component {
  state = {
    id: '12345',
    name: '',
    username: '',
    email: '',
    admin: false,
    initialLoad: true,
  };

  render() {
    return (
      <Container style={{ marginTop: '4.5em' }}>
        <Query
          query={USER_WITH_ID}
          variables={{ id: this.props.match.params.id }}
        >
          {({ loading, error, data }) => {
            if (loading) return <Loader active inline="centered" />;
            if (error) return `Error! ${error.message}`;

            if (this.state.initialLoad) {
              if (data.userWithId) {
                this.setState({
                  id: data.userWithId.id,
                  name: data.userWithId.name,
                  username: data.userWithId.username,
                  email: data.userWithId.email,
                  admin: data.userWithId.admin,
                  initialLoad: false,
                });
              }
            }

            return (
              <Mutation
                mutation={ADD_OR_MODIFY_USER}
                onCompleted={() => {
                  this.props.history.push('/users');
                }}
              >
                {(addUser, { data }) => (
                  <Form>
                    <Form.Input
                      label="name"
                      value={this.state.name}
                      onChange={e => this.setState({ name: e.target.value })}
                    />
                    <Form.Input
                      label="username"
                      value={this.state.username}
                      onChange={e =>
                        this.setState({ username: e.target.value })
                      }
                    />
                    <Form.Input
                      label="email"
                      value={this.state.email}
                      onChange={e => this.setState({ email: e.target.value })}
                    />
                    <Form.Field
                      label="admin"
                      control="input"
                      type="checkbox"
                      checked={this.state.admin}
                      onChange={e =>
                        this.setState({ admin: !this.state.admin })
                      }
                    />

                    <Form.Group>
                      <Form.Button
                        color="green"
                        onClick={() => {
                          addUser({
                            variables: {
                              id: this.state.id,
                              name: this.state.name,
                              username: this.state.username,
                              email: this.state.email,
                              admin: this.state.admin,
                            },
                          });
                        }}
                      >
                        Save
                      </Form.Button>
                      <Link to="/users" style={{ color: 'white' }}>
                        <Form.Button color="red">Cancel</Form.Button>
                      </Link>
                    </Form.Group>
                  </Form>
                )}
              </Mutation>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default ModifyUser;
