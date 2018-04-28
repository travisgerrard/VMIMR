// Top level view that displayes menu as well as content

import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import RotationNavBar from './RotationNavBar';
import RotationMainView from './RotationMainView';

class RotationTopLevelView extends Component {
  state = {
    activeItem: '',
    activeItemId: '',
    initialLoad: true,
  };

  handleMenubarItemClick = (e, { name, id }) => {
    this.setState({ activeItem: name });
    this.setState({ activeItemId: id });
  };

  handleRotationOnLanding = (name, id) => {
    console.log(name);

    this.setState({ activeItem: name });
    this.setState({ activeItemId: id });
    this.setState({ initialLoad: false });
  };

  render() {
    return (
      <div style={{ marginTop: '4.5em' }}>
        <Grid>
          <Grid.Column width={4}>
            <RotationNavBar
              rotationOnLanding={this.props.match.params.id}
              initialLoad={this.state.initialLoad}
              handleRotationOnLanding={this.handleRotationOnLanding}
              activeItem={this.state.activeItem}
              handleMenubarItemClick={this.handleMenubarItemClick}
            />
          </Grid.Column>
          <Grid.Column stretched width={12}>
            {this.state.activeItemId ? (
              <RotationMainView
                rotation={this.state.activeItem}
                id={this.state.activeItemId}
              />
            ) : (
              <h1>Select a rotation</h1>
            )}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default RotationTopLevelView;
