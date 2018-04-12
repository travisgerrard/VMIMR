import React, { Component } from 'react';
import { Dropdown, Menu, Input } from 'semantic-ui-react';
import { Query, Mutation, withApollo, readQuery, graphql } from 'react-apollo';
import GET_CURRENT_USER from '../../queries/CurrentUser';
import GET_LIST_OF_ROTATIONS from '../../queries/ListOfRotations';
import ADD_ROTATION from '../../mutations/AddRotation';

class RotationTopLevelView extends Component {
  state = {
    activeItem: '',
    rotationInput: '',
  };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  currentUser = () => {
    return (
      <Query query={GET_CURRENT_USER}>
        {({ loading, error, data }) => {
          if (loading) return '';
          if (error) return `Error! ${error.message}`;
          return <div />;
        }}
      </Query>
    );
  };

  listOfRotations = () => {
    return (
      <Query query={GET_LIST_OF_ROTATIONS}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          const { activeItem } = this.state;

          return (
            <div>
              {data.listOfRotations.map(rotation => (
                <Menu.Item
                  name={rotation.title}
                  active={activeItem === rotation.title}
                  onClick={this.handleItemClick}
                  key={rotation.title}
                >
                  {rotation.title}
                </Menu.Item>
              ))}
            </div>
          );
        }}
      </Query>
    );
  };

  addRotation = () => {
    const currentUserQuery = this.props.client.readQuery({
      query: GET_CURRENT_USER,
    });

    this.props
      .mutate({
        variables: {
          title: this.state.rotationInput,
          _creator: currentUserQuery.currentUser.id,
        },
        refetchQueries: [{ query: GET_LIST_OF_ROTATIONS }],
      })
      .then(this.setState({ rotationInput: '' }))
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  };

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      console.log(this.state.rotationInput);
      this.addRotation();
    }
    //console.log(this.props.client);
  };

  render() {
    return (
      <div style={{ marginTop: '4.5em' }}>
        <Menu secondary vertical>
          <Menu.Item>
            <Input
              placeholder="Add Rotation"
              value={this.state.rotationInput}
              onChange={e => this.setState({ rotationInput: e.target.value })}
              onKeyPress={this.handleKeyPress}
            />
          </Menu.Item>
          {this.listOfRotations()}
          {this.currentUser()}
        </Menu>
        <div />
      </div>
    );
  }
}

export default withApollo(graphql(ADD_ROTATION)(RotationTopLevelView));
