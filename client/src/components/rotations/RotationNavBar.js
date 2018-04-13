import React, { Component } from 'react';
import { Menu, Input } from 'semantic-ui-react';
import { Query, withApollo, graphql } from 'react-apollo';
import GET_CURRENT_USER from '../../queries/CurrentUser';
import GET_LIST_OF_ROTATIONS from '../../queries/ListOfRotations';
import ADD_ROTATION from '../../mutations/AddRotation';

class RotationTopLevelView extends Component {
  state = {
    rotationInput: '',
    errors: '',
  };

  listOfRotations = () => {
    return (
      <Query query={GET_LIST_OF_ROTATIONS}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          const { activeItem } = this.props;

          return (
            <div>
              {data.listOfRotations.map(rotation => (
                <Menu.Item
                  name={rotation.title}
                  active={activeItem === rotation.title}
                  id={rotation.id}
                  onClick={this.props.handleMenubarItemClick}
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
  };

  addRotationInput = () => {
    return (
      <Query query={GET_CURRENT_USER}>
        {({ loading, error, data }) => {
          if (loading) return '';
          if (error) return `Error! ${error.message}`;

          if (data.currentUser.admin) {
            return (
              <Menu.Item>
                <Input
                  placeholder="Add Rotation"
                  value={this.state.rotationInput}
                  onChange={e =>
                    this.setState({ rotationInput: e.target.value })
                  }
                  onKeyPress={this.handleKeyPress}
                />
              </Menu.Item>
            );
          } else {
            return <div />;
          }
        }}
      </Query>
    );
  };

  render() {
    return (
      <Menu secondary vertical>
        {this.addRotationInput()}
        {this.listOfRotations()}
      </Menu>
    );
  }
}

export default withApollo(graphql(ADD_ROTATION)(RotationTopLevelView));
