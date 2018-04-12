import React, { Component } from 'react';
import { Dropdown, Menu, Input } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import GET_CURRENT_USER from '../../queries/CurrentUser';
import GET_LIST_OF_ROTATIONS from '../../queries/ListOfRotations';

class RotationTopLevelView extends Component {
  state = { activeItem: '' };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  currentUser = () => {
    return (
      <Query query={GET_CURRENT_USER}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...';
          if (error) return `Error! ${error.message}`;

          return <div>{data.currentUser.name}</div>;
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

          console.log(data);

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

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      console.log('do validate');
      console.log(e.target.value);
    }
  };

  render() {
    return (
      <div style={{ marginTop: '4.5em' }}>
        <Menu secondary vertical>
          <Menu.Item>
            <Input
              placeholder="Add Rotation"
              onKeyPress={this.handleKeyPress}
            />
          </Menu.Item>
          {this.listOfRotations()}
        </Menu>
        <div />
      </div>
    );
  }
}

export default RotationTopLevelView;
