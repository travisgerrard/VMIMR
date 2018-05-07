// Top level view that displayes menu as well as content

import React, { Component } from 'react';
import { Segment, Menu } from 'semantic-ui-react';

import RotationNavBar from './RotationNavBar';
import RotationMainView from './RotationMainView';

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
            <h1>Select a rotation</h1>
          )}
        </Segment>
      </div>
    );
  }
}

export default RotationTopLevelView;
