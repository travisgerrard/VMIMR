import React, { Component } from 'react';
import { Menu, Input } from 'semantic-ui-react';
import { Query, withApollo, graphql } from 'react-apollo';
import { id, admin } from '../Utils';

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

          var sortedArray = data.listOfRotations.slice();
          sortedArray.sort(function(a, b) {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
          });

          return sortedArray.map(rotation => {
            if (
              this.props.rotationOnLanding === rotation.title &&
              this.props.initialLoad
            ) {
              this.props.handleRotationOnLanding(rotation.title, rotation.id);
            }
            return (
              <div key={rotation.id}>
                <Menu.Item
                  name={rotation.title}
                  active={activeItem === rotation.title}
                  id={rotation.id}
                  onClick={this.props.handleMenubarItemClick}
                  key={rotation.title}
                >
                  {rotation.title}
                </Menu.Item>
              </div>
            );
          });
        }}
      </Query>
    );
  };

  addRotation = () => {
    this.props
      .mutate({
        variables: {
          title: this.state.rotationInput,
          _creator: id(),
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
      this.addRotation();
    }
  };

  addRotationInput = () => {
    if (admin()) {
      return (
        <Menu.Item>
          <Input
            placeholder="Add Rotation"
            value={this.state.rotationInput}
            onChange={e => this.setState({ rotationInput: e.target.value })}
            onKeyPress={this.handleKeyPress}
            style={{ width: '160px' }}
          />
        </Menu.Item>
      );
    } else {
      return <div />;
    }
  };

  render() {
    return (
      <Menu secondary vertical style={{ width: '160px' }}>
        {/*this.addRotationInput()*/}
        {this.listOfRotations()}
      </Menu>
    );
  }
}

export default withApollo(graphql(ADD_ROTATION)(RotationTopLevelView));
