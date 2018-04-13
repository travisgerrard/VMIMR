import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import RotationNavBar from './RotationNavBar';
import RotationMainView from './RotationMainView';

class RotationTopLevelView extends Component {
  state = {
    activeItem: '',
    activeItemId: '5acd8914f0a4808f5423fd20',
  };

  handleMenubarItemClick = (e, { name, id }) => {
    this.setState({ activeItem: name });
    this.setState({ activeItemId: id });
  };

  render() {
    return (
      <div style={{ marginTop: '4.5em' }}>
        <Grid>
          <Grid.Column width={4}>
            <RotationNavBar
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
