import React, { Component } from 'react';
import { Container, Form, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

import USER_WITH_ID from '../../queries/UserWithId';

class ModifyUser extends Component {
  state = {
    name: '',
    username: '',
    email: '',
    admin: false,
    initialLoad: true,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps);
    return nextProps;
  }

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
              this.setState({
                name: data.userWithId.name,
                username: data.userWithId.username,
                email: data.userWithId.email,
                admin: data.userWithId.admin,
                initialLoad: false,
              });
            }

            return (
              <Form>
                <Form.Input
                  label="name"
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                />
                <Form.Input
                  label="username"
                  value={this.state.username}
                  onChange={e => this.setState({ username: e.target.value })}
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
                  onChange={e => this.setState({ admin: !this.state.admin })}
                />

                <Form.Group>
                  <Form.Button
                    color="green"
                    onClick={() =>
                      console.log(
                        this.state.name,
                        this.state.username,
                        this.state.email,
                        this.state.admin,
                      )
                    }
                  >
                    Save
                  </Form.Button>
                  <Link to="/users" style={{ color: 'white' }}>
                    <Form.Button color="red">Cancel</Form.Button>
                  </Link>
                </Form.Group>
              </Form>
            );
          }}
        </Query>
      </Container>
    );
  }
}

export default ModifyUser;
