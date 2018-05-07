// Top level view that displayes menu as well as content

import React, { Component } from 'react';
import { Segment, Menu, List } from 'semantic-ui-react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

import RotationNavBar from './RotationNavBar';
import RotationMainView from './RotationMainView';

import GET_LIST_OF_ROTATIONS from '../../queries/ListOfRotations';

class RotationTopLevelView extends Component {
  state = {
    activeItem: '',
    activeItemId: '',
    initialLoad: true,
  };

  handleMenubarItemClick = (e, { name, id }) => {
    //this.setState({ activeItem: name });
    //this.setState({ activeItemId: id });
    this.props.history.push(`/rotations/${name}`);
  };

  handleRotationOnLanding = (name, id) => {
    this.setState({ activeItem: name });
    this.setState({ activeItemId: id });
    this.setState({ initialLoad: false });
  };

  render() {
    return (
      <div>
        <Menu
          as={Menu}
          borderless
          vertical
          style={{
            position: 'fixed',
            top: '3.3em',
            bottom: '0px',
            overflowY: 'auto',
            width: '180px',
          }}
        >
          <RotationNavBar
            rotationOnLanding={this.props.match.params.id}
            initialLoad={this.state.initialLoad}
            handleRotationOnLanding={this.handleRotationOnLanding}
            activeItem={this.state.activeItem}
            handleMenubarItemClick={this.handleMenubarItemClick}
          />
        </Menu>
        <Segment
          basic
          style={{
            position: 'relative',
            marginLeft: '200px',
            marginTop: '3.3em',
          }}
        >
          {this.state.activeItemId ? (
            <RotationMainView
              rotation={this.state.activeItem}
              id={this.state.activeItemId}
            />
          ) : (
            <div>
              <h2>Select a rotation</h2>
              <Query query={GET_LIST_OF_ROTATIONS}>
                {({ loading, error, data }) => {
                  if (loading) return 'Loading...';
                  if (error) return `Error! ${error.message}`;

                  return data.listOfRotations.map(rotation => {
                    return (
                      <div key={rotation.id}>
                        <List.Item>
                          <Link to={`/rotations/${rotation.title}`}>
                            {rotation.title}
                          </Link>
                        </List.Item>
                      </div>
                    );
                  });
                }}
              </Query>
            </div>
          )}
        </Segment>
      </div>
    );
  }
}

export default RotationTopLevelView;
